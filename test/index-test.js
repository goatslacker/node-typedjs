var vows = require('vows');
var assert = require('assert');
var path = require('path');

var TypedJS = require('../');

var mock = {
  concat: {
    signature: 'concat :: String -> String -> String',
    fn: function concat(a, b) {
      return a + b;
    }
  },
  add: {
    signature: 'add :: Number -> Number -> Number',
    fn: 'function add(a, b) { return a + b }'
  }
};

vows.describe('typedjs').addBatch({
  'when adding a test case and running it': {
    topic: function () {
      var typedjs = new TypedJS();
      typedjs.add(mock.concat.signature, mock.concat.fn);
      return typedjs.run();
    },

    'should run the test case and return true': function (result) {
      assert.isTrue(result);
    }
  },

  'when parsing a file and running it': {
    topic: function () {
      var typedjs = new TypedJS();
      return typedjs.file(path.join(__dirname, '..', 'examples', 'test.js'));
    },

    'should parse the file, run it and return instrumented code': function (result) {
      assert.isString(result.code);
    }
  }
}).export(module);
