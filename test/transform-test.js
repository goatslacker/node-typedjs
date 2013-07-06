module.exports = function (assert, xform, filter, fn) {
//  var code = [
//    '//+ num :: Number -> Number',
//    'function num(n) {',
//    '  return n',
//    '}',
//    'num(false)'
//  ].join('\n')


  function findFunction(name, program) {
    return fn.head(filter(program, function (node) {
      return node.type == 'FunctionDeclaration' && node.id.name == name
    }))
  }

  function assertTGArgs(f) {
    var node = fn.head(filter(f.body, function (node) {
      return node.type == 'CallExpression' && node.callee.name == 'tg'
    }))

    assert.ok(!!node, 'TG arguments exists for ' + f.id.name)

    return fn.zipWith(function (a, b) {
      assert.deepEqual(a, b)
    }, fn.head(node.arguments.slice(1)).elements, f.params)
  }

  function getReturns(f) {
    return filter(f.body, function (node) {
      return node.type == 'ReturnStatement' &&
        node.argument.type == 'CallExpression' &&
        node.argument.callee.name == 'tg'
    })
  }

  function returnCount(f, n) {
    assert.equal(getReturns(f).length, n)
  }

  function returnType(f, t) {
    fn.map(function (ret) {
      assert.equal(ret.argument.arguments[0].name, t)
    }, getReturns(f))
  }

  return {
    'multiple returns': function () {
      var ast = xform('multiple-returns')
      var myfn = findFunction('hello', ast)

      assertTGArgs(myfn)
      returnCount(myfn, 2)
      returnType(myfn, 'String')
    },

    _xform: function () {
      var f = ast.body[0]
      var fbody = f.body.body
      assert.equal(f.type, 'FunctionDeclaration')
      assert.equal(fbody[0].expression.callee.name, 'tg')
      assert.equal(fbody[1].argument.callee.name, 'tg')
    }
  }
}
