module.exports = generate

var fu = require('fu')
var traverseObject = require('./traverseObject')
var traverseSignature = require('./traverseSignature')

var chars = (function () {
  var a = []
  for (var i = 32; i < 127; i += 1) {
    a.push(String.fromCharCode(i))
  }
  return a
}())

function loop(f, times, start) {
  times = times || Math.ceil((Math.random() * 20)) + 1
  return fu.foldl(f, Array.apply(Array, Array(times)), start)
}

function pick(arr) {
  return arr.slice().sort(function () { return Math.random() - 0.5 })[0]
}

function string() {
  return loop(function (str, x) {
    return str += pick(chars)
  }, null, '')
}

function genIdentifier() {
  return (string() + string()).replace(/[\W]/g, '')
}

function number() {
  return Math.ceil((Math.random() * 1e6)) + 1
}

function objOf(x, f) {
  return loop(function (obj) {
    obj[genIdentifier()] = generate(x, f)
    return obj
  }, null, {})
}

function generate(type, f) {
  function generateWithFunction(x) {
    return generate(x, f)
  }

  return traverseSignature(type, {
    or: function (x) {
      return generateWithFunction(pick(x))
    },
    maybe: function (x) {
      return pick([null, generateWithFunction(x)])
    },
    type: function (x) {
      return f(objOf(x, f))
    },
    fn: function (x) {
      throw new Error('Generate does not support fn')
    },
    obj: function (x) {
      return f(traverseObject(generateWithFunction, x))
    },
    array: function (x) {
      return f(fu.map(generateWithFunction, x))
    },
    any: function (type) {
      return pick([true, false, null, number(), string(), [], {}])
    },
    single: function (x) {
      switch (x) {
        case 'Boolean':
          return f(pick([true, false]))
        case 'Number':
          return f(number())
        case 'String':
          return f(string())
        case 'Array':
          return f([])
        case 'Object':
          return f({})
      }
    }
  })
}
