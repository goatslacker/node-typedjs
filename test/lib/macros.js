var assert = require('assert');

function success(result) {
  assert.isTrue(result);
}

function failure(result) {
  assert.isFalse(result);
}

function typedjs(tests) {
  assert.isObject(tests.typedjs);
}

function isObject(tests) {
  assert.isObject(tests);
}

function code(tests) {
  assert.isNotNull(tests.code);
  assert.isString(tests.code);
}

function testResults() {
  assert.equal(typeof this.tests.data, 'object');
  assert.equal(Object.keys(this.tests.data).length, 2);
}

function testsCount(n) {
  return function () {
    assert.equal(this.tests.tests.length, n);
  };
}

function resultsFailCount(n) {
  return function () {
    assert.equal(this.tests.data.fail.length, n);
  };
}

function resultsSuccessCount(n) {
  return function () {
    assert.equal(this.tests.data.success.length, n);
  };
}

module.exports = {
  assert: assert,
  success: success,
  failure: failure,
  typedjs: typedjs,
  code: code,
  testResults: testResults,
  testsCount: testsCount,
  resultsFailCount: resultsFailCount,
  resultsSuccessCount: resultsSuccessCount,
  isObject: isObject
};
