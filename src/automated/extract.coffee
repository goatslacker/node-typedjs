Parser = require '../parser'
vm = require 'vm'

compileFunction = (signature, node, code) ->
  name = signature.func
  args = []
  context = {}

  node.params.forEach (param) ->
    args.push param.name

  wrapped = "function #{name}(#{args.join(',')}) {\n #{code.slice(node.blockStart + 1, node.end)}\n}"

  vm.runInNewContext wrapped, context

  [signature.value, context[name]]


extract = (code, object) ->
  parser = new Parser code

  signatures = parser.getSignatures()
  functionList = parser.getFunctions()

  functionList.forEach (fn) ->
    if signatures.hasOwnProperty fn.name
      object.add.apply object, compileFunction(signatures[fn.name], fn, code)


module.exports = extract
