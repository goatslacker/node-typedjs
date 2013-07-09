module.exports = {
  asArray: asArray,
  comma: ', '
}

var fu = require('fu')

function asArray(x) {
  return fu.stringify('[', x, ']')
}
