var vows = require('vows');
var typedjs = require('../lib/index');
var code = require('./fixtures');
var mock = require('./lib/mock');
var macros = require('./lib/macros');


vows.describe('Automated Individual Tests').addBatch({
  'when creating the test runner': {
    topic: function () {
      this.tests = typedjs.createTests();
      return this.tests;
    },

    'typedjs should exist': macros.typedjs,
    'tests should be empty': macros.testsCount(0),

    'and adding a test': {
      topic: function () {
        this.tests = typedjs.createTests();
        return this.tests.add(mock.concat.signature, mock.concat.fn);
      },

      'should have a test in the test runner': macros.testsCount(1),

      'then running the tests': {
        topic: function () {
          return this.tests.run();
        },

        'should pass the tests': macros.success,
        'should have the test results': macros.testResults,
        'should have 0 failed functions in results': macros.resultsFailCount(0),
        'should have 1 successful function in results': macros.resultsSuccessCount(1),

        'finally clearing the tests': {
          topic: function () {
            return this.tests.clear();
          },

          'tests should be empty again': macros.testsCount(0)
        }
      }
    },

    'and adding a failing test': {
      topic: function () {
        this.tests = typedjs.createTests();
        return this.tests.add(mock.concat_fail.signature, mock.concat_fail.fn);
      },

      'and running the tests': {
        topic: function () {
          return this.tests.run();
        },

        'should fail the tests': macros.failure,
        'should have the test results': macros.testResults,
        'should have 1 failed function in results': macros.resultsFailCount(1),
        'should have 0 successful functions in results': macros.resultsSuccessCount(0),
      }
    }
  }
}).export(module);
