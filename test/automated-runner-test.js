var vows = require('vows');
var typedjs = require('../lib/index');
var code = require('./fixtures');
var macros = require('./lib/macros');


vows.describe('Automated tests on string')

.addBatch({
  'when creating the test runner': {
    topic: function () {
      this.tests = typedjs.createTests(code.str);
      return this.tests;
    },

    'typedjs should exist': macros.typedjs,
    'code should exist in Object and not be null': macros.code
  }
})

.addBatch({
  'Successful automated tests': {
    'when running the tests': {
      topic: function () {
        this.tests = typedjs.createTests(code.str);
        return this.tests.run();
      },

      'should pass the tests': macros.success,
      'should have the test results': macros.testResults,
      'should have 0 failed functions in results': macros.resultsFailCount(0),
      'should have 6 successful functions in results': macros.resultsSuccessCount(6)
    }
  }
})

.addBatch({
  'Failing automated tests': {
    'when running the tests': {
      topic: function () {
        this.tests = typedjs.createTests(code.failing);
        return this.tests.run();
      },

      'should fail the tests': macros.failure,
      'should have the test results': macros.testResults,
      'should have 1 failed function in results': macros.resultsFailCount(1),
      'should have 0 successful functions in results': macros.resultsSuccessCount(0)
    }
  }
}).export(module);
