var vows = require('vows');
var typedjs = require('../lib/index');
var code = require('./fixtures');
var macros = require('./lib/macros');


vows.describe('Contracts').addBatch({

  'when enforcing a contract': {
    'using a function as the runner': {
      topic: function () {
        return typedjs.enforce(code.str, function tests() {
          fullname({ first: 'Josh', last: 'Perez' });
        });
      },

      'should pass': macros.success
    },

    'using a string as the runner': {
      topic: function () {
        return typedjs.enforce(code.str, "fullname({ first: 'Josh', last: 'Perez' });");
      },

      'should pass': macros.success
    }
  }
}).export(module);
