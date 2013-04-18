typedjs_parser = require 'parser'

# underscore?
last = (coll) -> coll[coll.length - 1]
init = (coll) -> coll.slice(0, coll.length - 1)

toObject = (coll, fn) ->
  obj = {}
  coll.forEach (i) ->
    [key, value] = fn(i)
    if key and value
      obj[key] = value
  obj

comp = (fn, arg) -> () -> fn(arg)

kill = (cond, ret) -> if cond then ret() else null

parseSignature = (comment) ->
  signature = JSON.parse typedjs_parser.parse("//#{comment.value}")
  kill signature.func, -> [
    signature.func
    { return: last signature.args
    args: init signature.args
    value: comment }
  ]

getTypeSignature = (comment) ->
  kill comment.value[0] is '+', (comp parseSignature, comment)

# Extracts the type signatures from the comments
# if they are present.
#
# returns an Object containing the type signatures
# the type of arguments and the type of the return value.
parseSignatures = (comments) -> toObject comments, getTypeSignature

module.exports = parseSignatures
