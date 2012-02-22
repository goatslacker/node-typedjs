typedjs_parser = require '../../packages/TypedJS/typedjs_parser.js'

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
