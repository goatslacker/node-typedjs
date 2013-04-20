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

module.exports = instrument
