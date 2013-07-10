module.exports = traverseSignature

var fu = require('fu')

function getObjProperty(obj) {
  return fu.head(fu.filter(function (x) {
    return obj.hasOwnProperty(x)
  }, ['or', 'maybe', 'type', 'fn']))
}

function traverseSignature(x, f) {
  switch (toString.call(x)) {
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
      switch (x) {
        case 'Boolean':
        case 'Number':
        case 'String':
        case 'Array':
        case 'Object':
          return f.single(x)
        default:
          return f.any(x)
      }
  }
}
