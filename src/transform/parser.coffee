esprima = require 'esprima'
parseSignatures = require './signatures'

# I think i need to rewrite this one...
# only store the functions that actually will be type checked
traverse = (object, visitor, master) ->

  parent = if master is 'undefined' then [] else master

  return if visitor.call(null, object, parent) is false

  Object.keys(object).forEach (key) ->
    child = object[key]
    path = [object]
    path.push parent

    traverse(child, visitor, path) if typeof child is 'object' and child isnt null


class Parser
  constructor: (@code) ->
    @tree = esprima.parse @code, { comment: true, loc: true, range: true }

  getSignatures: ->
    parseSignatures(@tree.comments)

  getFunctions: ->
    list = []
    code = @code

    signatures = @getSignatures()

    isReturnStatement = (node) -> node.type is 'ReturnStatement'

    findReturn = (nodes) -> nodes.filter(isReturnStatement).pop()

    parseVariableDeclarator = (node) ->
      node.init.id = { name: node.id.name }
      parseFunctionDeclaration node.init


    parseAssignmentExpression = (node) ->
      node.right.id = { name: node.left.name }
      parseFunctionDeclaration node.right


    parseFunctionDeclaration = (node) ->
      return unless signatures[node.id.name]

      # XXX actually return something rather than side effects
      # XXX wtf is blockStart for. and why do I need params and shit
      list.push {
        name: node.id.name
        params: node.params
        range: node.range
        blockStart: node.body.range[0]
        end: node.body.range[1]
        return: findReturn node.body.body
      }


    traverse @tree, (node) ->
      switch node.type
        when 'FunctionDeclaration' then parseFunctionDeclaration node
        when 'AssignmentExpression' then parseAssignmentExpression node
        when 'VariableDeclarator' then parseVariableDeclarator node
        else return


    list



module.exports = Parser
