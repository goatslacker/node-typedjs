module.exports = function (typedjs, assert, fu) {
  var none = function (x) { return undefined }

  var qc = function (test) {
    return function (sig, f) {
      return test(function () {
        return typedjs.quickcheck(sig, f)
      }, TypeError)
    }
  }

  var ok = qc(assert.doesNotThrow)
  var fails = qc(assert.throws)

  function test(sig) {
    return function () {
      ok(sig, fu.id)
      fails(sig, none)
    }
  }

  function test1(sig, retval) {
    return function () {
      ok(sig, function () {
        return retval
      })
      fails(sig, none)
    }
  }

  function invalid(sig) {
    assert.throws(function () {
      return typedjs.quickcheck(sig, function (x) {
        return x
      })
    }, function (err) {
      return err.message == 'Unable to quickcheck dynamic functions'
    })
  }

  function noDynamic(sigs) {
    return function () {
      sigs.forEach(invalid)
    }
  }

  return {
    numbers: test('Number -> Number'),
    strings: test('String -> String'),
    bools: test('Boolean -> Boolean'),
    arrays: test('Array -> Array'),
    objects: test('Object -> Object'),
    'array of numbers': test('[Number] -> [Number]'),
    'nested arrays': test1('[String, [Number, String]] -> Boolean', false),
    'array of objects': test1('[{ x: String }] -> String', 'w00t'),
    'array of objects nested': test1('[{ a: [{ b: [String] }] }] -> Boolean', true),
    'object of numbers': test('{ Number } -> { Number }'),
    'object of a number for key': test('{ a: Number } -> { a: Number }'),
    'nested objects': test1('{ a: { b: { c: { d: String } } } } -> Number', 1),
    'maybe arguments': test1('Maybe Number -> Number', 1),
    'maybe return': test('String -> Maybe String'),
    'or arguments': test1('Number | String -> Number', 1),
    'or return': test1('Number -> String | Boolean', true),
    'invalid signatures': noDynamic([
      'even() -> Number',
      'even() | Number -> Number',
      'Number -> even()',
      '[even()] -> Number',
      'Number -> {a: even()}',
      '{a: even()} -> Number',
      'Maybe even() -> Number'
    ])
  }
}
