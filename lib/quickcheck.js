module.exports = quickcheck

var convert = require('./convert')
var fn = require('fn')
var generate = require('./generate')
var parseSignatures = require('./signatures')
var tg = require('tg').tg

function prefix(x) {
  return '+ x :: ' + x
}

function getSignature(signature) {
  var signatures = parseSignatures([prefix(signature)])
  var key = fn.head(Object.keys(signatures))

  if (!key) {
    throw new ReferenceError('No type signatures provided')
  }

  return signatures[key]
}

function generateArg(arg) {
  return generate(arg, fn.id)
}

function quickcheck(signature, f) {
  var expected = getSignature(signature)
  var typed = convert.toTG(expected)

  return fn.foldl(function () {
    var args = fn.map(generateArg, expected.args)

    return tg(typed.ret, (function (args) {
      tg(typed.args, args)
      return f.apply(f, args)
    }.call(null, args)))
  }, Array.apply(Array, Array(20)))
}
