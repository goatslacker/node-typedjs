module.exports = {
  toString: convertToString,
  toTG: convertToTG
}

var fn = require('fn')
var tg = require('tg').tg
var utils = require('./utils')
var traverseObject = require('./traverseObject')
var traverseSignature = require('./traverseSignature')

function pairs(obj) {
  return fn.map(function (key) {
    return [
      key,
      obj[key]
    ]
  }, Object.keys(obj))
}

function convertSignature(x) {
  return traverseSignature(x, {
    or: function (x) {
      return fn.stringify(
        'tg.Or(',
        fn.join(utils.comma, fn.map(convertSignature, x)),
        ')'
      )
    },
    maybe: function (x) {
      return fn.stringify('tg.Maybe(', convertSignature(x), ')')
    },
    type: function (x) {
      return fn.stringify('tg.Obj(', x, ')')
    },
    fn: function (x) {
      return fn.stringify('tg.f(', x, ')')
    },
    obj: function (x) {
      return fn.stringify('{', fn.join(utils.comma, fn.map(function (n) {
        return fn.join(':', n)
      }, pairs(x))), '}')
    },
    array: function (x) {
      return utils.asArray(fn.join(utils.comma, fn.map(convertSignature, x)))
    },
    otherwise: fn.id
  })
}

function toTG(x) {
  return traverseSignature(x, {
    or: function (x) {
      return tg.Or.apply(tg.Or, fn.map(toTG, x))
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
      return fn.map(toTG, x)
    },
    otherwise: fn.id
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
    args: fn.map(toTG, signature.args),
    ret: toTG(signature.ret)
  }
}
