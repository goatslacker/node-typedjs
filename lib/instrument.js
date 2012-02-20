/*global typedjs_parser */
var esprima = require('esprima');

function parseSignatures(comments) {
  var signatures = {};

  comments.forEach(function (comment) {
    var signature;

    if (comment.value[0] === '+') {
      comment = '//' + comment.value;
      signature = JSON.parse(typedjs_parser.parse(comment));
      if (signature.func) {
        signature.value = comment;
        signatures[signature.func] = signature;
      }
    }
  });

  return signatures;
}

/*
function compileFunction(node, signature, code) {
  var name = signature.func;
  var params = [];
  var context = {};

  node.params.forEach(function (param) {
    params.push(param.name);
  });

  var wrapped = 'function ' + name + '(' + params.join(',') + ') {\n' + code.slice(node.body.range[0] + 1, node.body.range[1]) + '\n}';

  vm.runInNewContext(wrapped, context);
  return [signature.value, context[name]];
}
*/

function traverse(object, visitor, master) {
  var key, child, parent, path;

  parent = (typeof master === 'undefined') ? [] : master;

  if (visitor.call(null, object, parent) === false) {
    return;
  }

  Object.keys(object).forEach(function (key) {
    child = object[key];
    path = [object];
    path.push(parent);
    if (typeof child === 'object' && child !== null) {
      traverse(child, visitor, path);
    }
  });
}

function instrument(code) {
  var functionList = [];
  var signature = '';
  var pos = 0;
  var i = 0;
  var args = '';
  var rng = [];
  var endPos = 0;

  var tree = esprima.parse(code, { comment: true, loc: true, range: true });

  var signatures = parseSignatures(tree.comments);


  function findScope(range) {
    var i, fn;
    i = functionList.length - 1;
    while (i > 0) {
      fn = functionList[i];
      if (range < fn.end) {
        return fn;
      }
      i -= 1;
    }
  }

  traverse(tree, function (node, path) {
    var parent, ret, obj;
    if (node.type === 'FunctionDeclaration') {
      functionList.push({
        name: node.id.name,
        range: node.range,
        blockStart: node.body.range[0],
        end: node.body.range[1]
      });
    } else if (node.type === 'ReturnStatement') {
      obj = findScope(node.range[1]);
      functionList.push({
        name: 'return',
        fn: obj && obj.name,
        range: node.range,
        argument: node.argument == null ? null : node.argument.range
      });
    } else if (node.type === 'FunctionExpression') {
      parent = path[0];
      if (parent.type === 'AssignmentExpression') {
        if (typeof parent.left.range !== 'undefined') {
          functionList.push({
            name: code.slice(parent.left.range[0], parent.left.range[1] + 1),
            range: node.range,
            blockStart: node.body.range[0],
            end: node.body.range[1]
          });
        }
      } else if (parent.type === 'VariableDeclarator') {
        functionList.push({
          name: parent.id.name,
          range: node.range,
          blockStart: node.body.range[0],
          end: node.body.range[1]
        });
      } else if (parent.type === 'CallExpression') {
        functionList.push({
          name: parent.id ? parent.id.name : '[Anonymous]',
          range: node.range,
          blockStart: node.body.range[0],
          end: node.body.range[1]
        });
      } else if (typeof parent.length === 'number') {
        functionList.push({
          name: parent.id ? parent.id.name : '[Anonymous]',
          range: node.range,
          blockStart: node.body.range[0],
          end: node.body.range[1]
        });
      } else if (typeof parent.key !== 'undefined') {
        if (parent.key.type === 'Identifier') {
          if (parent.value === node && parent.key.name) {
            functionList.push({
              name: parent.key.name,
              range: node.range,
              blockStart: node.body.range[0],
              end: node.body.range[1]
            });
          }
        }
      }
    }
  });

  // Insert the instrumentation code from the last entry.
  // This is to ensure that the range for each entry remains valid)
  // (it won't shift due to some new inserting string before the range).
  for (i = functionList.length - 1; i >= 0; i -= 1) {

    if (functionList[i].name === 'return') {
      signature = ' _$TypedJS.ret(';
      pos = functionList[i].range[0] + 6;

      if (functionList[i].argument == null) {
        args = 'undefined';
        endPos = functionList[i].range[1];
      } else {
        rng = functionList[i].argument;
        args = code.slice(rng[0], rng[1] + 1);
        endPos = rng[1] + 1;
      }

      code = code.slice(0, pos) + signature +
        '\'' + functionList[i].fn + '\', ' + args + ')' +
        code.slice(endPos, code.length);
    } else {
      signature = '_$TypedJS.args(\'' + functionList[i].name + '\', arguments);';
      pos = functionList[i].blockStart + 1;
      code = code.slice(0, pos) + '\n' + signature + code.slice(pos, code.length);
    }
  }

  return { code: code, signatures: signatures };


/*
  traverse(ast.body, function (node, path) {
    var f;
    if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
      f = path[0].key || node.id;
      if (f && f.name in signatures) {
        instance.add.apply(instance, compileFunction(node, signatures[f.name], code));
      }
    }
  });
  */
}


module.exports = instrument;
