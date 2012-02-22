Tests = require './tests'

class RunTests extends Tests

  run: ->
    @data = @typedjs.run_tests_on_string @code
    @data[0].length is 0


module.exports = RunTests
