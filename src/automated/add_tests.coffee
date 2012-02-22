Tests = require './tests'
vm = require './typedjs_vm'


class AddTests extends Tests
  constructor: ->
    @tests = []
    @typedjs = vm()

  add: (signature, func) ->
    @tests.push @typedjs.addTest(signature, func)

  run: ->
    @data = @typedjs.go @tests
    @data[0].length is 0

  clear: ->
    @tests = []


module.exports = AddTests
