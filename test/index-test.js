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
      typedjs.file(path.join(__dirname, '..', 'examples', 'test.js'));
      return typedjs.run();
    },

    'should parse the file, run it and return false': function (result) {
      assert.isFalse(result);
    }
  },

  'when parsing code as a string': {
    topic: function () {
      var typedjs = new TypedJS();
      typedjs.string('//+ ' + mock.add.signature + '\n' + mock.add.fn);
      return typedjs.run();
    },

    'should parse and succeed': function (result) {
      assert.isTrue(result);
    }
  }
}).export(module);
