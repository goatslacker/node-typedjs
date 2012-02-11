var fs = require('fs');
var vm = require('vm');

var TypedJS = fs.readFileSync('packages/TypedJS/typed.js', 'utf-8');
var Parser = require('./packages/TypedJS/typedjs_parser.js');

function callTypedJS(method, context, args) {
  context.typedjs_parser = Parser;
  context.console = context.console || console;
  context.window = context.window || {};

  vm.runInNewContext(TypedJS, context);

  return context.TypedJS[method].apply(context.TypedJS, args);
}

function parseFile(fileName, context) {
  context = context || {};
  context.window = {};

  var data = fs.readFileSync(fileName, 'utf-8');

  vm.runInNewContext(data, context.window);
  callTypedJS('run_tests_on_string', context, [data]);
}

var test_cases = [];

var api = {
  addTest: function (signature, func) {
    var test = callTypedJS('addTest', {}, [signature, func]);
    test_cases.push(test);
    return test;
  },

  runTests: function (arg, cb) {
    var tests = test_cases.slice(0);
    test_cases = [];

    var reporter = {
      log: function (data) {
        cb && cb(data);
      }
    };

    if (typeof arg === 'string') {
      return parseFile(arg, cb && ({ console: reporter }));
    }

    if (!arg || typeof arg === 'function') {
      cb = arg;
      return callTypedJS('go', { console: reporter }, [tests]);
    }

    throw new TypeError('Unexpected argument passed.');
  },

  rmAllTests: function () {
    test_cases = [];
  }
};

module.exports = api;
