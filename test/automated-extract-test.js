var vows = require('vows');
var typedjs = require('../lib/index');
var code = require('./fixtures');
var macros = require('./lib/macros');


vows.describe('Automated tests extracting functions')

.addBatch({
  'when running tests while extracting all functions': {
    topic: function () {
      this.tests = typedjs.createTests(code.closures, true);
      return this.tests;
    },

    'typedjs should exist': macros.typedjs,
    'tests should be empty': macros.testsCount(0),
    'code should exist in Object and not be null': macros.code,

    'then running the tests': {
      topic: function () {
        return this.tests.run();
      },

      'should pass the tests': macros.success,
      'should have the test results': macros.testResults,
      'should have 0 failed functions in results': macros.resultsFailCount(0),
      'should have 3 successful functions in results': macros.resultsSuccessCount(3),

      'finally clearing the tests': {
        topic: function () {
          return this.tests.clear();
        },

        'tests should be empty again': macros.testsCount(0)
      }
    }
  }
})

.addBatch({
  'when extracting functions with side effects': {
    topic: function () {
      this.tests = typedjs.createTests(code.sidefx, true);
      return this.tests;
    },

    'typedjs should exist': macros.typedjs,
    'tests should be empty': macros.testsCount(0),
    'code should exist in Object and not be null': macros.code,

    'then running the tests': {
      topic: function () {
        return this.tests.run();
      },

      'should fail the tests': macros.failure,
      'should have the test results': macros.testResults,
      'should have 1 failed function in results': macros.resultsFailCount(1),
      'should have 1 successful functions in results': macros.resultsSuccessCount(1)
    }
  }
}).export(module);
