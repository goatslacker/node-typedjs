var test = require('./index-test.js');

function runner(cb) {
  test.typedjs.run(null, function (results) {
    cb(results.errored || results.broken);
  });
}

module.exports = runner;

