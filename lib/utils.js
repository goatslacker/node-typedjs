module.exports = {
  asArray: asArray,
  comma: ', '
}

var fn = require('fn')

function asArray(x) {
  return fn.stringify('[', x, ']')
}
