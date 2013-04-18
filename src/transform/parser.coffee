esprima = require 'esprima'
parseSignatures = require './signatures'

isReturnStatement = (node) -> node.type is 'ReturnStatement'

findReturn = (nodes) -> nodes.filter(isReturnStatement).pop()

flatMap = (coll, fn) ->
  result = []
  coll.forEach (item) ->
    if Array.isArray item
    then Array::push.apply result, item
    else result.push item
  result

compact = (coll) -> coll.filter (item) -> not item

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

# don't mutate, needs to return
traverse = (object, visitor) ->
  return if visitor.call(null, object) is false

  (compact (flatMap Object.keys(object), (key) ->
    child = object[key]
    traverse(child, visitor) if typeof child is 'object' and child isnt null))

module.exports = (code) ->
  tree = esprima.parse code, { comment: true, loc: true, range: true }

  signatures = parseSignatures tree.comments

  # XXX don't pass in signatures
  traverse tree, (node) ->
    switch node.type
      when 'FunctionDeclaration' then parseFunctionDeclaration node, signatures
      when 'AssignmentExpression' then parseAssignmentExpression node, signatures
      when 'VariableDeclarator' then parseVariableDeclarator node, signatures
      else return
