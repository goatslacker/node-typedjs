Parser = require '../parser/'
AddTests = require './add_tests'
vm = require 'vm'


class ExtractTests extends AddTests

  compileFunction: (name, node, code) ->
    args = []
    context = {}

    node.params.forEach (param) ->
      args.push param.name

    wrapped = "function #{name}(#{args.join(',')}) {\n #{code.slice(node.blockStart + 1, node.end)}\n}"

    vm.runInNewContext wrapped, context

    context[name]


  run: ->
    parser = new Parser @code

    signatures = parser.getSignatures()
    functionList = parser.getFunctions()

    functionList.forEach (fn) =>
      if signatures.hasOwnProperty fn.name
        signature = signatures[fn.name]
        @.add signature.value, @compileFunction(signature.func, fn, @code)

    super


module.exports = ExtractTests
