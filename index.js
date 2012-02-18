/*global typedjs_parser: true */

var typedjs = require('./packages/TypedJS/typed.js');
typedjs_parser = require('./packages/TypedJS/typedjs_parser.js');
var fs = require('fs');
var util = require('util');

var parser = require('./parser');

typedjs.quiet = true;


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

  var instrumented = parser(this, code);
  console.log(instrumented);
};

Tests.prototype.trace = function trace(filepath) {
  var code = fs.readFileSync(filepath).toString();
//  var code = filepath;

  // parse code and
  // retrieve type signatures
  var parsed = parse(code);
  var signatures = parseSignatures(parsed.ast.comments);

  // modify the code to instrument it
  // so we can add 'contracts'
  code = esprima.modify(code, [esprima.Tracer.FunctionEntrance('enforceType')]);

//  return console.log(code);
return;

  // run the code sandboxed in a vm
  // TODO along with unit tests
  // with our type checking function made available
//  vm.runInNewContext(code, { enforceType: enforceType, enforceType_return: enforceType_return });

  // defines our type checking function
  function enforceType(name, range, args) {
    var base = signatures[name];

    // If the type signature exists
    if (base) {
      base.args.forEach(function (arg, index) {
        // the last one is the Return
        if (index === base.args.length - 1) {
          return;
        }

        // Check the Type
        if (!typedjs.check_type(args[index], arg)) {
          throw new TypeError(name + ': Expected ' + util.inspect(arg) + ' but received ' + util.inspect(args[index]));
        }
      });
    }
  }

  function enforceType_return(name, value) {
    var base = signatures[name];
    var expected;

    if (base) {
      expected = base.args[base.args.length - 1]

      // Check the Type
      if (!typedjs.check_type(value, expected)) {
        throw new TypeError(name + ': Expected ' + util.inspect(expected) + ' but received ' + util.inspect(value));
      }
    }

    // return back to function so program works correctly
    return value;
  }

  return {
    code: code,
    enforceType: enforceType,
    enforceType_return: enforceType_return
  };
};

Tests.prototype.rm = function rm() {
  this.tests = [];
};

Tests.parser = typedjs_parser;

module.exports = Tests;
