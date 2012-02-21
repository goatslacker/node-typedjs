typedjs = require './typedjs_vm'

typedjs.quiet = true

class Tests

  tests: []

  data: null

  add: (signature, func) ->
    @tests.push typedjs.addTest(signature, func)

  string: (code, extract) ->
    @data = typedjs.run_tests_on_string code
    @data[0].length is 0

  run: ->
    @data = typedjs.go @tests
    @data[0].length is 0

  clear: ->
    @tests = []


cloneObject = ->
  new Tests


module.exports = cloneObject
