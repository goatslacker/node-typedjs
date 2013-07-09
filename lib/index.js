var fu = require('fu')
fu.stringify = function (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return fu.foldl(function (a, b) {
    return a + b
  }, args)
}
exports.transform = require('./transform')
exports.quickcheck = require('./quickcheck')
exports['require'] = require('./require')
