Parser = require '../parser'

instrument = (code) ->

  parser = new Parser code

  signatures = parser.getSignatures()
  functionList = parser.getFunctions()

  # Insert the instrumentation code from the last entry.
  # This is to ensure that the range for each entry remains valid)
  # (it won't shift due to some new inserting string before the range).
  i = functionList.length - 1
  while i >= 0

    fn = functionList[i]

    if fn.name is 'return'
      posStart = fn.range[0] + 6

      if fn.arg is null
        args = 'undefined'
        posEnd = fn.range[1]
      else
        args = code.slice fn.arg[0], fn.arg[1]
        posEnd = fn.arg[1]

      signature = "_$TypedJS.ret('#{fn.fn}', #{args})"
      code = "#{code.slice(0, posStart)} #{signature} #{code.slice(posEnd, code.length)}"
    else
      signature = "_$TypedJS.args('#{functionList[i].name}', arguments);"
      posStart = functionList[i].blockStart + 1
      code = "#{code.slice(0, posStart)}\n#{signature}#{code.slice(posStart, code.length)}"

    i -= 1


  result =
    instrumentedCode: code
    signatures: signatures

  result


module.exports = instrument
