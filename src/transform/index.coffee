Parser = require '../parser/'
util = require 'util'

getReturnValue = (code, ret) ->
  valueCharPosStart = ret.range[0] + 7
  valueCharPosEnd = ret.range[1]
  if valueCharPosStart < valueCharPosEnd then code.slice(valueCharPosStart, valueCharPosEnd) else undefined


wrap = (types, args) ->
  fTypes = util.inspect types, null, false
  "_tjs_(#{fTypes}, #{args});"


# XXX rather than code.splicing how about we do code transforming via an AST and then compile using escodegen.
# the cons would be that you lose any special code style..
instrument = (code) ->
  parser = new Parser code

  signatures = parser.getSignatures()
  functionList = parser.getFunctions()

  # Insert the instrumentation code from the last entry.
  # This is to ensure that the range for each entry remains valid)
  # (it won't shift due to some new inserting string before the range).
  functionList.reverse().forEach (fn) ->
    sig = signatures[fn.name]

    returnValue = getReturnValue code, fn.return
    code = code.slice(0, fn.return.range[0]) + "return #{wrap [sig.return], returnValue}" + code.slice(fn.return.range[1] + 1, code.length)

    signature = wrap sig.args, 'arguments'
    posStart = fn.blockStart + 1
    code = "#{code.slice(0, posStart)}\n#{signature}#{code.slice(posStart, code.length)}"


  result =
    instrumentedCode: code
    signatures: signatures

  result


# I need to write a badass _tjs_
# extract away util.inspect and typedjs, do our own typechecking here
_tjs_ = (types, args) ->
  throw new TypeError 'Argument length mismatch' unless types.length == args.length
  types.forEach (type, i) ->
    throw new TypeError "#{name} Expected #{util.inspect(type)} but received #{util.inspect(args[i])}" unless typedjs.check_type args[i], type
  args[0]


module.exports = (code) ->
  { instrumentedCode } = instrument code
  "var _tjs_ = #{_tjs_.toString()}\n#{instrumentedCode}"

