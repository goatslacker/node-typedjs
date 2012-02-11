var vows = require('vows');
var assert = require('assert');
var path = require('path');

var typedjs = require('../');


var mock = {
  concat: {
    signature: 'concat :: String -> String -> String',
    fn: function concat(a, b) {
      return a + b;
    }
  }
};

function reply(cb) {
  var count = 0;
  return function () {
    if (count > 0) {
      return false;
    }
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift(null);
    cb.apply(cb, args);
    count += 1;
  };
}


vows.describe('typedjs').addBatch({
  'when adding a test case and running it': {
    topic: function () {
      typedjs.addTest(mock.concat.signature, mock.concat.fn);
      typedjs.runTests(reply(this.callback));
    },

    'should run all test cases and not fail': function (result) {
      assert.isString(result);
    }
  },

  'when parsing a file and running it': {
    topic: function () {
      typedjs.runTests(path.join(__dirname, '..', 'examples', 'test.js'), reply(this.callback));
    },

    'should receive the stream of events': function (results) {
      assert.isString(results);
    }
  }
}).export(module);
