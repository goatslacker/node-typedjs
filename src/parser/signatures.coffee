typedjs_parser = require '../../packages/TypedJS/typedjs_parser.js'

# Extracts the type signatures from the comments
# if they are present.
#
# returns an Object containing the type signatures
# the type of arguments and the type of the return value.
parseSignatures = (comments) ->
  signatures = {}

  comments.forEach (comment) ->
    if comment.value[0] is '+'
      comment = '//' + comment.value
      signature = JSON.parse typedjs_parser.parse(comment)

      if signature.func
        signature.value = comment
        signatures[signature.func] = signature

  signatures


module.exports = parseSignatures
