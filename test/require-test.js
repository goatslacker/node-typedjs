module.exports = function (typedjs, assert) {
  var plusone = typedjs.require('test/fixtures/plusone.js')

  return {
    required: function () {
      assert.equal(plusone(1), 2)

      assert.throws(function () {
        plusone('1')
      }, function (err) {
        return err.message === 'Expected number but received string (1)'
      })
    }
  }
}
