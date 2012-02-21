var vows = require('vows');
var assert = require('assert');
var path = require('path');

var typedjs = require('../lib/index');

var mock = require('./mock');
var macros = require('./macros');


vows.describe('typedjs').addBatch({
  'when adding mock.concat and running it': {
    topic: function () {
      var tests = typedjs.single();
      tests.add(mock.concat.signature, mock.concat.fn);
      return tests.run();
    },

    'should pass': macros.truth
  },

//  'when passing in a string': {
//    topic: function () {
//      var tests = typedjs.single();
//      tests.string(mock.fullname);
//      return tests.run();
//    },

//    'should return true': macros.truth
//  }

  'when extracting functions from mock.fullname': {
    topic: function () {
      var tests = typedjs.single();
      typedjs.extract(mock.fullname, tests);
      return tests.run();
    },

    'should pass': macros.truth
  }

}).export(module);
