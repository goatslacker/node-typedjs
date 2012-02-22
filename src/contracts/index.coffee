fs = require 'fs'
vm = require 'vm'

instrument = require './instrument'
createSandbox = require './createSandbox'


mixInto = (base = {}, obj = {}) ->
  Object.keys(obj).forEach((key) ->
    base[key] = obj[key]
  )

  base


getContext = (code, sandbox) ->
  { instrumentedCode, signatures } = instrument code
  context = createSandbox signatures

  script = vm.createScript instrumentedCode

  context = mixInto context, sandbox

  script.runInContext context

  context


enforce = (code, runner, sandbox = {}) ->
  context = getContext code, sandbox

  switch typeof runner
    when 'string' then vm.runInNewContext runner, context
    when 'function' then vm.runInNewContext "(#{runner.toString()}());", context
    else throw new TypeError 'Runner must be either a Function or a String'

  true


module.exports = enforce
