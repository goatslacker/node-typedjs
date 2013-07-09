module.exports = quickcheck

var convert = require('./convert')
var fu = require('fu')
var generate = require('./generate')
var parseSignatures = require('./signatures')
var tg = require('tg').tg

function prefix(x) {
  return '+ x :: ' + x
}

function getSignature(signature) {
  var signatures = parseSignatures([prefix(signature)])
  var key = fu.head(Object.keys(signatures))

  if (!key) {
    throw new ReferenceError('No type signatures provided')
  }

  return signatures[key]
}

function generateArg(arg) {
  return generate(arg, fu.id)
}

function quickcheck(signature, f) {
  var expected = getSignature(signature)
  var typed = convert.toTG(expected)

  return fu.foldl(function () {
    var args = fu.map(generateArg, expected.args)

    return tg(typed.ret, (function (args) {
      tg(typed.args, args)
      return f.apply(f, args)
    }.call(null, args)))
  }, Array.apply(Array, Array(20)))
}
