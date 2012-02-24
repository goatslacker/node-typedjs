fs = require 'fs'
vm = require 'vm'

instrument = require './instrument'
createSandbox = require './createSandbox'


mixInto = (base = {}, obj = {}) ->
  Object.keys(obj).forEach((key) ->
    base[key] = obj[key]
  )

  base


class Contracts

  data: null

  constructor: (code = '') ->
    @code = code

  getContext: (sandbox, signatures) ->
    { @instrumentedCode, @signatures } = instrument @code
    context = createSandbox signatures or @signatures

    script = vm.createScript @instrumentedCode
    context = mixInto context, sandbox
    script.runInContext context

    @data = context._$TypedJS.data

    context

  run: (runner, sandbox = {}) ->
    context = @getContext sandbox

    return false if Object.keys(@signatures).length is 0

    switch typeof runner
      when 'string'
        vm.runInNewContext runner, context
      when 'function'
        runner context, @instrumentedCode
      else throw new TypeError 'Runner must be either a Function or a String.'


    true


cloneObject = (code) ->
  new Contracts code


module.exports = cloneObject
