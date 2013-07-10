module.exports = {
  toString: convertToString,
  toTG: convertToTG
}

var fu = require('fu')
var tg = require('tg').tg
var utils = require('./utils')
var traverseObject = require('./traverseObject')
var traverseSignature = require('./traverseSignature')

function pairs(obj) {
  return fu.map(function (key) {
    return [
      key,
      obj[key]
    ]
  }, Object.keys(obj))
}

function convertSignature(x) {
  return traverseSignature(x, {
    or: function (x) {
      return fu.stringify(
        'tg.Or(',
        fu.map(convertSignature, x).join(utils.comma),
        ')'
      )
    },
    maybe: function (x) {
      return fu.stringify('tg.Maybe(', convertSignature(x), ')')
    },
    type: function (x) {
      return fu.stringify('tg.Obj(', x, ')')
    },
    fn: function (x) {
      return fu.stringify('tg.assert(', x, ')')
    },
    obj: function (x) {
      return fu.stringify(
        '{',
        fu.map(function (n) {
          return n.join(':')
        }, pairs(x)).join(utils.comma),
        '}'
      )
    },
    array: function (x) {
      return utils.asArray(fu.map(convertSignature, x).join(utils.comma))
    },
    any: function () {
      return 'tg.Any'
    },
    single: fu.id
  })
}

function toTG(x) {
  return traverseSignature(x, {
    or: function (x) {
      return tg.Or.apply(tg.Or, fu.map(toTG, x))
    },
    maybe: function (x) {
      return tg.Maybe(toTG(x))
    },
    type: function (x) {
      return tg.Obj(toTG(x))
    },
    fn: function () {
      throw new Error('Unable to quickcheck dynamic functions')
    },
    obj: function (x) {
      return traverseObject(toTG, x)
    },
    array: function (x) {
      return fu.map(toTG, x)
    },
    any: function (x) {
      return tg.Any
    },
    single: fu.id
  })
}

function convertToString(signature) {
  return {
    args: convertSignature(signature.args),
    ret: convertSignature(signature.ret)
  }
}

function convertToTG(signature) {
  return {
    args: fu.map(toTG, signature.args),
    ret: toTG(signature.ret)
  }
}
