module.exports = parseSignatures

var fu = require('fu')
var traverseObject = require('./traverseObject')
var traverseSignature = require('./traverseSignature')
var typedjsParser = require('parser')

function genSignature(signature, comment) {
  var args = signature.args

  return [
    signature.func,
    { ret: fu.last(args),
      args: fu.init(args),
      value: comment }
  ]
}

function genAlias(signature, comment) {
  return [
    signature.type,
    { alias: signature.alias,
      value: comment }
  ]
}

function parseSignature(comment) {
  var signature = JSON.parse(typedjsParser.parse('//' + (comment) + ''))

  return signature.type && signature.alias
    ? genAlias(signature, comment)
    : signature.func != null
      ? genSignature(signature, comment)
      : null
}

function getTypeSignature(comment) {
  return comment[0] === '+'
    ? parseSignature(comment)
    : null
}

function traverseSignatureWithAliases(signatures, type) {
  var self = fu.curry(traverseSignatureWithAliases, signatures)

  return traverseSignature(type, {
    or: function (x) {
      return { or: self(x) }
    },
    maybe: function (x) {
      return { maybe: self(x) }
    },
    type: function (x) {
      return { type: self(x) }
    },
    fn: function (x) {
      return { fn: x }
    },
    obj: function (x) {
      return { obj: traverseObject(self, x) }
    },
    array: function (x) {
      return fu.map(self, x)
    },
    any: function (x) {
      return signatures[x] ? self(signatures[x].alias) : x
    },
    single: fu.id
  })
}

function parseSignatures(comments) {
  var signatures = fu.intoObject(
    fu.compact(
      fu.map(getTypeSignature, comments)))

  return fu.intoObject(fu.compact(fu.map(function (key) {
    var val = signatures[key]
    var curriedTraversal = fu.curry(traverseSignatureWithAliases, signatures)

    return val.alias
      ? null
      : [key, {
        ret: curriedTraversal(val.ret),
        args: fu.map(curriedTraversal, val.args),
        value: val.value
      }]
  }, Object.keys(signatures))))
}
