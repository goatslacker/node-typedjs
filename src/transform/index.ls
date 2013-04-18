parser = require './parser'
util = require 'util'

getReturnValue = (code, ret) ->
  value_char_pos_start = ret.range[0] + 7
  value_char_pos_end = ret.range[1]
  if value_char_pos_start < value_char_pos_end
  then code.slice(value_char_pos_start, value_char_pos_end)
  else void

wrap = (types, args) ->
  formatted_types = util.inspect types, null, false
  "_tjs_(#{formatted_types}, #{args});"

# has side effects, mutates code
# ugly
instrument = (code) ->
  (parser code).reverse().map (fn) ->
    sig = fn.signature

    return_value = getReturnValue code, fn.return
    code := code.slice(0, fn.return.range[0]) + "return #{wrap [sig.return], return_value}" + code.slice(fn.return.range[1] + 1, code.length)

    signature = wrap sig.args, 'arguments'
    pos_start = fn.blockStart + 1
    code := "#{code.slice(0, pos_start)}\n#{signature}#{code.slice(pos_start, code.length)}"

  code

# I need to write a badass _tjs_
# extract away util.inspect and typedjs, do our own typechecking here
_tjs_ = (types, args) ->
  throw new TypeError 'Argument length mismatch' unless types.length == args.length
  types.forEach (type, i) ->
    throw new TypeError "#{name} Expected #{util.inspect(type)} but received #{util.inspect(args[i])}" unless typedjs.check_type args[i], type
  args[0]

module.exports = (code) ->
  "var _tjs_ = #{_tjs_.toString()};\n#{instrument code}"
