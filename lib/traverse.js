module.exports = traverse

var fn = require('fn')

function traverse(object, visitor, exit) {
  if (exit && exit(object) === true) {
    return null
  }

  function walkTree(key) {
    var child = object[key]
    var type = fn.toString(child)
    return type == '[object Object]' || type == '[object Array]'
      ? traverse(child, visitor, exit)
      : null
  }
  return fn.compact(
    [visitor(object)].concat(
      fn.concatMap(walkTree, Object.keys(object))))
}
