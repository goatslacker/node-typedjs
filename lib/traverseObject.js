module.exports = traverseObject

var fn = require('fn')

function traverseObject(f, obj) {
  return fn.toMap(fn.map(function (key) {
    return [key, f(obj[key])]
  }, Object.keys(obj)))
}
