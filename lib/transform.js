module.exports = transformWithTG

var fu = require('fu')
var parser = require('./parser')
var fs = require('fs')
var utils = require('./utils')

function getArgs(x) {
  return fu.map(fu.property('name'), x).join(utils.comma)
}

function buildTypeCheck(args, val) {
  return fu.stringify('tg(', args, utils.comma, val, ')', ';')
}

function get(code, start, end) {
  return code.substr(start, end - start)
}

function getReturnValue(code, argRange) {
  var argStart = argRange[0]
  var argEnd = argRange[1]
  return get(code, argStart, argEnd)
}

function addReturnValue(code, returnSignature, node) {
  var typeValues = node.argument
    ? getReturnValue(code, node.argument.range)
    : 'undefined'

  return fu.stringify(
    'return ',
    buildTypeCheck(returnSignature, typeValues)
  )
}

function getTgArguments(node) {
  var typeParams = node.signature.args
  var typeValues = utils.asArray(getArgs(node.params))
  return buildTypeCheck(typeParams, typeValues)
}

function instrumentFunction(code, node) {
  var blockStart = node.blockStart + 1
  var codeUntilFunction = get(code, 0, blockStart)
  var tgArguments = getTgArguments(node)

  var fBody = fu.foldl(function (x, ret) {
    var val = addReturnValue(code, node.signature.ret, ret)
    return {
      start: ret.range[1],
      code: fu.stringify(x.code, get(code, x.start, ret.range[0]), val)
    }
  }, node.ret, { start: blockStart, code: '' })

  var functionEnd = get(code, fBody.start - 1, node.end + 1)

  return fu.stringify(codeUntilFunction, tgArguments, fBody.code, functionEnd)
}

function reducer(code, node) {
  return instrumentFunction(code, node).concat(code.slice(node.end + 1))
}

function transform(code) {
  var parsed = parser(code)
  return parsed.length ? fu.foldl(reducer, parsed.reverse(), code) : code
}

function getTg() {
  return String(fs.readFileSync('node_modules/tg/tg.min.js'))
}

function transformWithTG(x) {
  return fu.stringify(transform(x), ';', getTg())
}
