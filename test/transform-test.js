module.exports = function (typedjs, assert, esprima) {
  var code = [
    '//+ num :: Number -> Number',
    'function num(n) {',
    '  return n',
    '}',
    'num(false)'
  ].join('\n')

  var ast = esprima.parse(typedjs.transform(code))

  return {
    xform: function () {
      var f = ast.body[0]
      var fbody = f.body.body
      assert.equal(f.type, 'FunctionDeclaration')
      assert.equal(fbody[0].expression.callee.name, 'tg')
      assert.equal(fbody[1].argument.callee.name, 'tg')
    }
  }
}
