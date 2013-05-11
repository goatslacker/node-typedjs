esprima = require 'esprima'
parseSignatures = require './signatures'

isReturnStatement = (node) -> node.type is 'ReturnStatement'

findReturn = (nodes) -> nodes.filter(isReturnStatement).pop()

flatMap = (coll, fn) ->
  result = []
  coll.forEach (x) ->
    item = fn x
    if Array.isArray item
    then Array::push.apply result, item
    else result.push item
  result

compact = (coll) -> coll.filter (item) -> Boolean item

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
    ret: findReturn node.body.body
    signature: signatures[node.id.name]
  }

traverse = (object, visitor) ->
  walkTree = (key) ->
    child = object[key]
    traverse(child, visitor) if typeof child is 'object' and child isnt null

  (compact ([visitor object].concat (flatMap (Object.keys object), walkTree)))

module.exports = (code) ->
  tree = esprima.parse code, { comment: true, loc: true, range: true }

  signatures = parseSignatures tree.comments

  traverse tree, (node) ->
    switch node.type
      when 'FunctionDeclaration' then parseFunctionDeclaration node, signatures
      when 'AssignmentExpression' then parseAssignmentExpression node, signatures
      when 'VariableDeclarator' then parseVariableDeclarator node, signatures
      else return null
