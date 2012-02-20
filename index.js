/*global typedjs_parser: true */

var typedjs = require('./packages/TypedJS/typed.js');
typedjs_parser = require('./packages/TypedJS/typedjs_parser.js');

var fs = require('fs');
var vm = require('vm');

var instrument = require('./lib/instrument');
var sandbox = require('./lib/contracts');

typedjs.quiet = true;


function contracts_string(code, box) {
  box = box || {};

  var instrumented = instrument(code);
  sandbox.signatures = instrumented.signatures;
  instrumented = instrumented.code;

  var script = vm.createScript(instrumented, 'code');
  var context = vm.createContext();
  context._$TypedJS = sandbox;
  Object.keys(box).forEach(function (key) {
    context[key] = box[key];
  });
  script.runInContext(context);
  return context;
//  return { code: instrumented.code + ';' + tests, sandbox: sandbox };
}

function contracts_file(file, runner, callback) {
  fs.readFile(file, 'utf-8', function (err, code) {
    if (err) {
      throw err;
    }

    contracts_string(code, runner, callback);
  });
}


module.exports = {
  contracts: contracts_string
};
