module.exports = traverseSignature

var fn = require('fn')

function getObjProperty(obj) {
  return fn.head(fn.filter(function (x) {
    return obj[x]
  }, ['or', 'maybe', 'type', 'fn']))
}

function traverseSignature(x, f) {
  switch (fn.toString(x)) {
    case '[object Object]':
      switch (getObjProperty(x)) {
        case 'or':
          return f.or(x.or)
        case 'maybe':
          return f.maybe(x.maybe)
        case 'type':
          return f.type(x.type)
        case 'fn':
          return f.fn(x.fn)
        default:
          return f.obj(x.obj)
      }
    case '[object Array]':
      return f.array(x)
    default:
      return f.otherwise(x)
  }
}
