esprima = require 'esprima'
parseSignatures = require './parseSignatures'

traverse = (object, visitor, master) ->

  parent = if master is 'undefined' then [] else master

  return if visitor.call(null, object, parent) is false

  Object.keys(object).forEach (key) ->
    child = object[key]
    path = [object]
    path.push parent

    traverse(child, visitor, path) if typeof child is 'object' and child isnt null


class Parser
  constructor: (code) ->
    @tree = esprima.parse code, { comment: true, loc: true, range: true }

  getSignatures: ->
    parseSignatures(@tree.comments)

  getFunctions: ->
    list = []

    findScope = (range) ->
      i = list.length - 1
      while i > 0
        fn = list[i]
        return fn if range < fn.end
        i -= 1

      null


    traverse @tree, (node, path) ->
      if node.type is 'ReturnStatement'
        obj = findScope node.range[1]

        list.push {
          name: 'return'
          fn: obj && obj.name
          range: node.range,
          arg: if node.argument is null then null else node.argument.range
        }

      else if node.type is 'FunctionDeclaration'
        list.push {
          name: node.id.name
          params: node.params
          range: node.range
          blockStart: node.body.range[0]
          end: node.body.range[1]
        }

      else if node.type is 'FunctionExpression'
        parent = path[0]

        if parent.type is 'AssignmentExpression'
          if typeof parent.left.range isnt 'undefined'
            list.push {
              name: code.slice(parent.left.range[0], parent.left.range[1] + 1)
              params: node.params
              range: node.range
              blockStart: node.body.range[0]
              end: node.body.range[1]
            }

        else if parent.type is 'VariableDeclarator'
          list.push {
            name: parent.id.name
            params: node.params
            range: node.range
            blockStart: node.body.range[0]
            end: node.body.range[1]
          }

        else if parent.type is 'CallExpression'
          list.push {
            name: if parent.id then parent.id.name else '[Anonymous]'
            params: node.params
            range: node.range
            blockStart: node.body.range[0]
            end: node.body.range[1]
          }

        else if typeof parent.length is 'number'
          list.push {
            name: if parent.id then parent.id.name else '[Anonymous]'
            params: node.params
            range: node.range
            blockStart: node.body.range[0]
            end: node.body.range[1]
          }

        else if typeof parent.key isnt 'undefined'
          if parent.key.type is 'Identifier'
            if parent.value is node and parent.key.name
              list.push {
                name: parent.key.name
                params: node.params
                range: node.range
                blockStart: node.body.range[0]
                end: node.body.range[1]
              }


    list



module.exports = Parser
