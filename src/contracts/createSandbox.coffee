vm = require 'vm'
typedjs_parser = '../../packages/TypedJS/typedjs_parser.js'

_$TypedJS = (
  typedjs: require '../../packages/TypedJS/typed.js'
  util: require 'util'

  signatures: {}

  # defines our type checking function
  args: (name, args) ->
    base = _$TypedJS.signatures[name]

    # If the type signature exists
    if base
      base.args.forEach((arg, index) ->
        # the last one is the Return
        return if index is (base.args.length - 1)

        # Check the Type
        if !_$TypedJS.typedjs.check_type args[index], arg
          throw new TypeError "#{name} Expected #{_$TypedJS.util.inspect(arg)} but received #{_$TypedJS.util.inspect(args[index])}"
      )

    base


  ret: (name, value) ->
    base = _$TypedJS.signatures[name]

    if base
      expected = base.args[base.args.length - 1]

      # Check the Type
      if !_$TypedJS.typedjs.check_type value, expected
        throw new TypeError "#{name} Expected #{_$TypedJS.util.inspect(expected)} but received #{_$TypedJS.util.inspect(value)}"

    #return back to function so program works correctly
    value
)


createSandbox = (signatures) ->
  _$TypedJS.signatures = signatures

  context = vm.createContext()
  context._$TypedJS = _$TypedJS
  context.typedjs_parser = typedjs_parser

  context


module.exports = createSandbox
