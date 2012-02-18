/*global typedjs_parser */
var esprima = require('esprima');
var vm = require('vm');

var Syntax = {
    AssignmentExpression: 'AssignmentExpression',
    ArrayExpression: 'ArrayExpression',
    BlockStatement: 'BlockStatement',
    BinaryExpression: 'BinaryExpression',
    BreakStatement: 'BreakStatement',
    CallExpression: 'CallExpression',
    CatchClause: 'CatchClause',
    ConditionalExpression: 'ConditionalExpression',
    ContinueStatement: 'ContinueStatement',
    DoWhileStatement: 'DoWhileStatement',
    DebuggerStatement: 'DebuggerStatement',
    EmptyStatement: 'EmptyStatement',
    ExpressionStatement: 'ExpressionStatement',
    ForStatement: 'ForStatement',
    ForInStatement: 'ForInStatement',
    FunctionDeclaration: 'FunctionDeclaration',
    FunctionExpression: 'FunctionExpression',
    Identifier: 'Identifier',
    IfStatement: 'IfStatement',
    Literal: 'Literal',
    LabeledStatement: 'LabeledStatement',
    LogicalExpression: 'LogicalExpression',
    MemberExpression: 'MemberExpression',
    NewExpression: 'NewExpression',
    ObjectExpression: 'ObjectExpression',
    Program: 'Program',
    ReturnStatement: 'ReturnStatement',
    SequenceExpression: 'SequenceExpression',
    SwitchStatement: 'SwitchStatement',
    SwitchCase: 'SwitchCase',
    ThisExpression: 'ThisExpression',
    ThrowStatement: 'ThrowStatement',
    TryStatement: 'TryStatement',
    UnaryExpression: 'UnaryExpression',
    UpdateExpression: 'UpdateExpression',
    VariableDeclaration: 'VariableDeclaration',
    VariableDeclarator: 'VariableDeclarator',
    WhileStatement: 'WhileStatement',
    WithStatement: 'WithStatement'
};

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

function parse(code) {
  var ast = esprima.parse(code, { comment: true, loc: true, range: true });

  return {
    ast: ast,
    code: code
  };
}

function walkAST(instance, ast, code) {
}

function instrument(instance, code) {
  var functionList = [];
  var signature = '';
  var pos = 0;
  var i = 0;

  var traceName = 'enforceType';

  var tree = parse(code).ast;

  var signatures = parseSignatures(tree.comments);


  function findScope(range) {
      var i, fn;
      i = functionList.length -1;
      while (i > 0) {
          fn = functionList[i];
          if (range < fn.end) {
              return fn;
          }
          i -= 1;
      }
  }

  traverse(tree, function (node, path) {
      var parent, ret;
      if (node.type === 'FunctionDeclaration') {
          functionList.push({
              name: node.id.name,
              range: node.range,
              blockStart: node.body.range[0],
              end: node.body.range[1]
          });
      } else if (node.type === Syntax.ReturnStatement) {
          var obj = findScope(node.range[1]);
          functionList.push({
              name: 'return',
              fn: obj && obj.name,
              range: node.range
          });
      } else if (node.type === Syntax.FunctionExpression) {
          parent = path[0];
          if (parent.type === Syntax.AssignmentExpression) {
              if (typeof parent.left.range !== 'undefined') {
                  functionList.push({
                      name: code.slice(parent.left.range[0],
                                parent.left.range[1] + 1),
                      range: node.range,
                      blockStart: node.body.range[0],
                      end: node.body.range[1]
                  });
              }
          } else if (parent.type === Syntax.VariableDeclarator) {
              functionList.push({
                  name: parent.id.name,
                  range: node.range,
                  blockStart: node.body.range[0],
                  end: node.body.range[1]
              });
          } else if (parent.type === Syntax.CallExpression) {
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
          signature = ' ' + traceName + '_return(';
          pos = functionList[i].range[0] + 6;
          var args;
          if (!!code.slice(pos,
              functionList[i].range[1]).trim()) {
              args = code.slice(pos, functionList[i].range[1]);
          } else {
              args = 'undefined';
          }
          code = code.slice(0, pos) + signature +
              '"' + functionList[i].fn + '", ' +
              args + ')' +
              code.slice(functionList[i].range[1], code.length);
      } else {
          signature = traceName + '(\'' + functionList[i].name + '\', ' +
            '[' + functionList[i].range[0] + ', ' +
            functionList[i].range[1] + '], arguments);';

          pos = functionList[i].blockStart + 1;
          code = code.slice(0, pos) + '\n' + signature + code.slice(pos, code.length);
      }
  }

  return code;


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
