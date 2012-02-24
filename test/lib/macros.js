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

function code(tests) {
  assert.isNotNull(tests.code);
  assert.isString(tests.code);
}

function testResults() {
  assert.isTrue(Array.isArray(this.tests.data));
}

function testsCount(n) {
  return function () {
    assert.equal(this.tests.tests.length, n);
  };
}

function resultsFailCount(n) {
  return function () {
    assert.equal(this.tests.data[0].length, n);
  };
}

function resultsSuccessCount(n) {
  return function () {
    assert.equal(this.tests.data[1].length, n);
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
  resultsSuccessCount: resultsSuccessCount
};
