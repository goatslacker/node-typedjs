Tests = require './tests'
vm = require './typedjs_vm'


class AddTests extends Tests
  constructor: ->
    @tests = []
    @typedjs = vm()

  add: (signature, func) ->
    @tests.push @typedjs.addTest(signature, func)

  run: ->
    super @typedjs.go @tests

  clear: ->
    @tests = []


module.exports = AddTests
