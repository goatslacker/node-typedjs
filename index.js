/*global typedjs_parser: true */

var typedjs = require('./packages/TypedJS/typed.js');
typedjs_parser = require('./packages/TypedJS/typedjs_parser.js');
var esprima = require('esprima');
var fs = require('fs');
var vm = require('vm');

typedjs.quiet = true;

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

function walkAST(instance, ast, code) {
  var signatures = parseSignatures(ast.comments);

  traverse(ast.body, function (node, path) {
    var f;
    if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
      f = path[0].key || node.id;
      if (f && f.name in signatures) {
        instance.add.apply(instance, compileFunction(node, signatures[f.name], code));
      }
    }
  });
}


function Tests() {
  this.tests = [];
}

Tests.prototype.add = function add(signature, func) {
  this.tests.push(typedjs.addTest(signature, func));
};

Tests.prototype.run = function run() {
  this.data = typedjs.go(this.tests);
  return (this.data[0].length === 0);
};

Tests.prototype.string = function string(code) {
  var parsed = parse(code);

  walkAST(this, parsed.ast, code);
};

Tests.prototype.file = function file(filepath) {
  var code = fs.readFileSync(filepath).toString();
  var parsed = parse(code);

  walkAST(this, parsed.ast, code);
};

Tests.prototype.rm = function rm() {
  this.tests = [];
};

Tests.parser = typedjs_parser;

module.exports = Tests;
