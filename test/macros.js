var assert = require('assert');

function truth(result) {
  assert.isTrue(result);
}

module.exports = {
  truth: truth
};
