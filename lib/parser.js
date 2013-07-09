module.exports = parser

var esprima = require('esprima')
var fu = require('fu')
var parseSignatures = require('./signatures')
var convert = require('./convert')
var traverse = require('./traverse')

function isFunctionType(t) {
  return t == 'FunctionDeclaration' || t == 'FunctionExpression'
}

function findReturnStatements(nodes) {
  return traverse(nodes, function (node) {
    return node.type == 'ReturnStatement' ? node : null
  }, function (node) {
    return isFunctionType(node.type)
  })
}

function parseFunctionDeclaration(node, signatures) {
  return node.id != null && signatures[node.id.name] != null
    ? { name: node.id.name,
      params: node.params,
      range: node.range,
      blockStart: node.body.range[0],
      end: node.body.range[1],
      ret: findReturnStatements(node.body.body),
      signature: convert.toString(signatures[node.id.name]) }
    : null
}

function getParseFunction(t) {
  return isFunctionType(t)
    ? parseFunctionDeclaration
    : null
}

function parseNodeType(node, signatures) {
  var parser = getParseFunction(node.type)
  return parser == null
    ? null
    : parser(node, signatures)
}

function parser(code) {
  var tree = esprima.parse(code, {
    comment: true,
    loc: true,
    range: true
  })
  var signatures = parseSignatures(tree.comments.map(function (x) {
    return x.value
  }))

  return traverse(tree, function (x) {
    return parseNodeType(x, signatures)
  })
}
