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

parseSignature = (comment) ->
  signature = JSON.parse typedjs_parser.parse("//#{comment.value}")
  value = [ signature.func
    { ret: last signature.args
    args: init signature.args
    value: comment } ]

  value if signature.func

getTypeSignature = (comment) ->
  (parseSignature comment) if comment.value[0] is '+'

parseSignatures = (comments) -> toObject comments, getTypeSignature

module.exports = parseSignatures
