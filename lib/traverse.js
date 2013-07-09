module.exports = traverse

var fu = require('fu')

function traverse(object, visitor, exit) {
  if (exit && exit(object) === true) {
    return null
  }

  function walkTree(key) {
    var child = object[key]
    var type = toString.call(child)
    return type == '[object Object]' || type == '[object Array]'
      ? traverse(child, visitor, exit)
      : null
  }
  return fu.compact(
    [visitor(object)].concat(
      fu.concatMap(walkTree, Object.keys(object))))
}
