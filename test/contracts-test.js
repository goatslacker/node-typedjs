var vows = require('vows');
var typedjs = require('../lib/index');
var code = require('./fixtures');
var macros = require('./lib/macros');


vows.describe('Contracts').addBatch({

  'when enforcing a contract': {
    topic: function () {
      this.tests = typedjs.enforce(code.str);
      return this.tests;
    },

    'code should exist in Object and not be null': macros.code,

    'and not passing a runner': {
      'should throw an error': function () {
        macros.assert.throws(this.tests.run);
      }
    },

    'and passing a function as the runner': {
      topic: function () {
        return this.tests.run(function tests(context) {
          context.fullname({ first: 'Josh', last: 'Perez' });
        });
      },

      'should pass': macros.success
    },

    'and passing a string as the runner': {
      topic: function () {
        return this.tests.run("fullname({ first: 'Josh', last: 'Perez' });");
      },

      'should pass': macros.success,
      'should have 0 failed functions in results': macros.resultsFailCount(0),
      'should have 1 successful function in results': macros.resultsSuccessCount(1)
    }
  },

  'when enforcing a contract on code with no signatures': {
    topic: function () {
      this.tests = typedjs.enforce(code.no_sig);
      return this.tests;
    },

    'code should exist in Object and not be null': macros.code,

    'run without adding signatures': {
      topic: function () {
        return this.tests.run(function (context) {
          context.multiply(2, 3);
        });
      },

      'should fail because no signatures were found': macros.failure,

      'signatures should be an empty Object': function () {
        macros.assert.isObject(this.tests.signatures);
        macros.assert.equal(Object.keys(this.tests.signatures), 0);
      }
    }

  },

  'when enforcing a contract on code that fails': {
    topic: function () {
      this.tests = typedjs.enforce(code.failing);
      return this.tests.run('foo(2)');
    },

    'should return false': macros.failure,
    'should have 1 failed function in results': macros.resultsFailCount(1),
    'should have 0 successful functions in results': macros.resultsSuccessCount(0)
  },

  'when attempting to enforce a contract on no code at all': {
    'should throw a ReferenceError': function () {
      macros.assert.throws(typedjs.enforce);
    }
  }
}).export(module);
