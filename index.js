/*global typedjs_parser: true */

var typedjs = require('./packages/TypedJS/typed.js');

var fs = require('fs');
var vm = require('vm');

var instrument = require('./lib/instrument');
var createSandbox = require('./lib/contracts');

typedjs.quiet = true;


function mixInto(base, obj) {
  Object.keys(obj).forEach(function (key) {
    base[key] = obj[key];
  });

  return base;
}


function contracts_string(code, box) {
  box = box || {};

  var instrumented = instrument(code);
  var context = createSandbox(instrumented.signatures);

  instrumented = instrumented.code;

  var script = vm.createScript(instrumented, 'code');

  context = mixInto(context, box);

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
