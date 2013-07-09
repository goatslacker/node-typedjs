module.exports = traverseObject

var fu = require('fu')

function traverseObject(f, obj) {
  return fu.intoObject(fu.map(function (key) {
    return [key, f(obj[key])]
  }, Object.keys(obj)))
}
