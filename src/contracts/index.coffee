vm = require 'vm'

instrument = require './instrument'
createSandbox = require './createSandbox'

errMessage = 'Runner must be either a Function or a String.'


mixInto = (base = {}, obj = {}) ->
  Object.keys(obj).forEach((key) ->
    base[key] = obj[key]
  )

  base


class Contracts

  constructor: (code) ->
    throw new ReferenceError "Code is not defined." if not code

    @code = code
    @data = null

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

    try
      switch typeof runner
        when 'string'
          vm.runInNewContext runner, context
        when 'function'
          runner context, @instrumentedCode
        else throw new TypeError errMessage
    catch err
      throw err if err.message is errMessage

    @data.fail.length is 0


cloneObject = (code) ->
  new Contracts code


module.exports = cloneObject
