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

    'and retrieving the context of the code': {
      topic: function () {
        return this.tests.getContext({ foo: 'Hello World' });
      },

      'should be an Object and not be null': macros.isObject,
      'foo should be present': function (cx) {
        macros.assert.equal(cx.foo, 'Hello World');
      }
    },

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

  'when enforcing another contract': {
    topic: function () {
      this.tests = typedjs.enforce(code.str);
      return this.tests;
    },

    'and adding to the context': {
      topic: function () {
        var test;

        this.tests.run('foo();', {
          foo: function () {
            test = 12;
          }
        });

        return test;
      },

      'should call our foo function': function (foo) {
        macros.assert.equal(foo, 12);
      }
    }
  },

  'when enforcing a contract on code with no signatures': {
    topic: function () {
      this.tests = typedjs.enforce(code.no_sig);
      return this.tests;
    },

    'code should exist in Object and not be null': macros.code,

    'and we run without adding signatures': {
      topic: function () {
        return this.tests.run(function (context) {
          context.multiply(2, 3);
        });
      },

      'should fail because no signatures were found': macros.failure,

      'signatures should be an empty Object': function () {
        macros.assert.isObject(this.tests.signatures);
        macros.assert.equal(Object.keys(this.tests.signatures), 0);
      },

      'but then we change to code with signatures': {
        topic: function () {
          return this.tests.code = code.str;
        },

        'and run multiple tests': {
          topic: function () {
            return this.tests.run(function (context) {
              context.add_tos(2, 2);
              context.test_arr(1, 'C');
              context.fullname(true);
            });
          },

          'should fail since we added a failing case': macros.failure,
          'should have 1 failed functions in results': macros.resultsFailCount(1),
          'should have 2 successful functions in results': macros.resultsSuccessCount(2)
        }
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
