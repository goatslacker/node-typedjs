vm = require 'vm'
typedjs_parser = '../../packages/TypedJS/typedjs_parser.js'

class TypedJS
  constructor: (signatures = {}) ->
    @data =
      success: []
      fail: []
    @signatures = signatures

  typedjs: require '../../packages/TypedJS/typed.js'
  util: require 'util'

  fail: (name) ->
    @data.fail.push name if @data.fail.indexOf(name) is -1

  success: (name) ->
    @data.success.push name if @data.fail.indexOf(name) is -1 and @data.success.indexOf(name) is -1

  # defines our type checking function
  args: (name, args) ->
    base = @signatures[name]

    # If the type signature exists
    if base
      base.args.forEach((arg, index) =>
        # the last one is the Return
        return if index is (base.args.length - 1)

        # Check the Type
        if !@typedjs.check_type args[index], arg
          @fail name
          throw new TypeError "#{name} Expected #{@util.inspect(arg)} but received #{@util.inspect(args[index])}"
      )
      @success name

    base


  ret: (name, value) ->
    base = @signatures[name]

    if base
      expected = base.args[base.args.length - 1]

      # Check the Type
      if !@typedjs.check_type value, expected
        @fail name
        throw new TypeError "#{name} Expected #{@util.inspect(expected)} but received #{@util.inspect(value)}"

      @success name

    #return back to function so program works correctly
    value


createSandbox = (signatures) ->
  _$TypedJS = new TypedJS signatures

  context = vm.createContext()
  context._$TypedJS = _$TypedJS
  context.typedjs_parser = typedjs_parser

  context


module.exports = createSandbox
