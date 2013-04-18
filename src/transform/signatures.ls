typedjs_parser = require 'parser'

papply = (fn, arg) ->
  -> fn arg

Maybe = (cond, ret) -> if cond then ret() else null

parseSignature = (comment) ->
  signature = JSON.parse (typedjs_parser.parse "//#{comment.value}")
  Maybe signature.func, -> [
    signature.func
    { return: (last signature.args)
    args: (initial signature.args)
    value: comment }
  ]

getTypeSignature = (comment) ->
  Maybe comment.value[0] is '+', (papply parseSignature, comment)

# Extracts the type signatures from the comments
# if they are present.
#
# returns an Object containing the type signatures
# the type of arguments and the type of the return value.
parseSignatures = (comments) -> listToObj (map getTypeSignature, comments)

module.exports = parseSignatures
