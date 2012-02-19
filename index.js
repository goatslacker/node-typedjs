/*global typedjs_parser: true */

var typedjs = require('./packages/TypedJS/typed.js');
typedjs_parser = require('./packages/TypedJS/typedjs_parser.js');
var fs = require('fs');

var instrument = require('./lib/instrument');

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

//Tests.prototype.string = function string(code) {
//  var parsed = parse(code);
//
//  walkAST(this, parsed.ast, code);
//};

Tests.prototype.file = function file(filepath) {
  var code = fs.readFileSync(filepath).toString();

  var instrumented = instrument(this, code);
  return instrumented;
};

Tests.prototype.rm = function rm() {
  this.tests = [];
};

Tests.parser = typedjs_parser;

module.exports = Tests;
