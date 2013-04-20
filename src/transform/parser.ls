esprima = require 'esprima'
parseSignatures = require './signatures'

is-return-statement = (node) -> node.type == 'ReturnStatement'

find-return = (nodes) -> last (nodes.filter is-return-statement)

compact = (coll) -> coll.filter (item) -> item !~= null

_compact = curry filter (~= null)

parseVariableDeclarator = (node, signatures) ->
  node.init.id = { name: node.id.name }
  parseFunctionDeclaration node.init, signatures

parseAssignmentExpression = (node, signatures) ->
  node.right.id = { name: node.left.name }
  parseFunctionDeclaration node.right, signatures

parseFunctionDeclaration = (node, signatures) ->
  if signatures[node.id.name]
  then { name: node.id.name
  params: node.params
  range: node.range
  blockStart: node.body.range[0]
  end: node.body.range[1]
  return: find-return node.body.body
  signature: signatures[node.id.name] }
  else void

traverse = (object, visitor) ->
  walk-tree = (key) ->
    child = object[key]
    if typeof child is 'object' and child isnt null
    then traverse child, visitor
    else void
  compact [visitor object] ++ concat-map walk-tree, (keys object)

module.exports = (code) ->
  tree = esprima.parse code, { comment: true, loc: true, range: true }
  signatures = parseSignatures tree.comments
  traverse tree, (node) ->
    switch node.type
    | 'FunctionDeclaration' => parseFunctionDeclaration node, signatures
    | 'AssignmentExpression' => parseAssignmentExpression node, signatures
    | 'VariableDeclarator' => parseVariableDeclarator node, signatures
    | otherwise void
