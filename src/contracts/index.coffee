fs = require 'fs'
vm = require 'vm'

instrument = require './instrument'
createSandbox = require './createSandbox'

#typedjs.quiet = true

mixInto = (base = {}, obj = {}) ->
  Object.keys(obj).forEach((key) ->
    base[key] = obj[key]
  )

  base


contracts = (code, sandbox) ->
  { instrumentedCode, signatures } = instrument code
  context = createSandbox signatures

  script = vm.createScript instrumentedCode

  context = mixInto context, sandbox

  script.runInContext context

# return { code: instrumented.code + ';' + tests, sandbox: sandbox };
  context


module.exports = contracts
