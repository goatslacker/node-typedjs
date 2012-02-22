vm = require './typedjs_vm'

AddTests = require './add_tests'
RunTests = require './run_tests'
ExtractTests = require './extract_tests'


cloneObject = (code, extract) ->

  if extract is true
    tests = new ExtractTests
    tests.code = code
  else if code
    tests = new RunTests
    tests.code = code
    tests.typedjs = vm code
  else
    tests = new AddTests
    tests.typedjs = vm()

  tests.typedjs.quiet = true

  tests


module.exports = cloneObject
