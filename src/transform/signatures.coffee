typedjs_parser = require '../../packages/TypedJS/typedjs_parser.js'

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


getTypeSignature = (comment) ->
  return if comment.value[0] isnt '+'

  comment = '//' + comment.value
  signature = JSON.parse typedjs_parser.parse(comment)

  return unless signature.func

  return [signature.func, {
    return: last signature.args
    args: init signature.args
    value: comment
  }]


# Extracts the type signatures from the comments
# if they are present.
#
# returns an Object containing the type signatures
# the type of arguments and the type of the return value.
parseSignatures = (comments) -> toObject comments, getTypeSignature

module.exports = parseSignatures