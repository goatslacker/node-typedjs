Tests = require './tests'

class RunTests extends Tests

  run: ->
    super @typedjs.run_tests_on_string @code


module.exports = RunTests
