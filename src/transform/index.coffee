parser = require './parser'

comma = ', '

capitalize = (x) -> x.charAt(0).toUpperCase() + x.slice(1)

getArgs = (params) -> (params.map (x) -> x.name).join comma

addSignature = (sig) ->
  sig = if (Array.isArray sig) then sig else [sig]
  (sig.map capitalize).join comma

get = (code, start, end) -> code.substr start, end - start

concat = (a, b) -> a.concat b

stringify = (args...) -> args.reduce concat


getReturnValue = (code, argRange) ->
  [argStart, argEnd] = argRange
  get code, argStart, (argEnd + 1)

addReturnValue = (code, x, blockStart, blockEnd) ->
  retStart = x.ret.range[0]

  typeValues = if x.ret.argument then getReturnValue(code, x.ret.argument.range) else 'undefined'

  stringify(
    get(code, blockStart, retStart),
    'return ',
    buildTypeCheck(
      addSignature(x.signature.ret),
      typeValues
    )
  )

buildTypeCheck = (args, val) -> stringify '_tg(', args, comma, val, ');'

asArray = (x) -> stringify '[', x, ']'

instrumentFunction = (code, start, x) ->
  blockStart = x.blockStart
  blockEnd = x.end
  retEnd = 1 + if x.ret.argument then x.ret.argument.range[1] else x.ret.range[1]

  inc = blockStart + 1

  get(code, start, blockStart) +
    buildTypeCheck(
      asArray(addSignature(x.signature.args)),
      asArray(getArgs(x.params))
    ) +
    addReturnValue(code, x, inc, blockEnd) +
    get(code, retEnd + 1, blockEnd + 1)

reducer = (code, node) ->
  instrumentFunction(code, 0, node) + code.slice(node.end + 1)

instrument = (code) ->
  info = parser code
  [code].concat(info.reverse()).reduce reducer

module.exports = instrument
