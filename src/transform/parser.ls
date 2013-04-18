esprima = require 'esprima'
parseSignatures = require './signatures'

isReturnStatement = (node) -> node.type == 'ReturnStatement'

findReturn = (nodes) -> last (nodes.filter isReturnStatement)

compact = (coll) -> coll.filter (item) -> item !~= null

_compact = curry filter (~= null)

parseVariableDeclarator = (node, signatures) ->
  node.init.id = { name: node.id.name }
  parseFunctionDeclaration node.init, signatures

parseAssignmentExpression = (node, signatures) ->
  node.right.id = { name: node.left.name }
  parseFunctionDeclaration node.right, signatures

parseFunctionDeclaration = (node, signatures) ->
  return unless signatures[node.id.name]
  {
    name: node.id.name
    params: node.params
    range: node.range
    blockStart: node.body.range[0]
    end: node.body.range[1]
    return: findReturn node.body.body
    signature: signatures[node.id.name]
  }

traverse = (object, visitor) ->
  walkTree = (key) ->
    child = object[key]
    traverse(child, visitor) if typeof child is 'object' and child isnt null
  compact [visitor object] ++ concatMap walkTree, (keys object)

module.exports = (code) ->
  tree = esprima.parse code, { comment: true, loc: true, range: true }
  signatures = parseSignatures tree.comments
  traverse tree, (node) ->
    switch node.type
    | 'FunctionDeclaration' => parseFunctionDeclaration node, signatures
    | 'AssignmentExpression' => parseAssignmentExpression node, signatures
    | 'VariableDeclarator' => parseVariableDeclarator node, signatures
    | otherwise return
