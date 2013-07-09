module.exports = function (assert, xform, filter, fu) {
//  var code = [
//    '//+ num :: Number -> Number',
//    'function num(n) {',
//    '  return n',
//    '}',
//    'num(false)'
//  ].join('\n')


  function findFunction(name, program) {
    return fu.head(filter(program, function (node) {
      return node.type == 'FunctionDeclaration' && node.id.name == name
    }))
  }

  function assertTGArgs(f) {
    var node = fu.head(filter(f.body, function (node) {
      return node.type == 'CallExpression' && node.callee.name == 'tg'
    }))

    assert.ok(!!node, 'TG arguments exists for ' + f.id.name)

    return fu.zipWith(function (a, b) {
      assert.deepEqual(a, b)
    }, fu.head(node.arguments.slice(1)).elements, f.params)
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
    fu.map(function (ret) {
      assert.equal(ret.argument.arguments[0].name, t)
    }, getReturns(f))
  }

  return {
    'multiple returns': function () {
      var ast = xform('multiple-returns')
      var myfu = findFunction('hello', ast)

      assertTGArgs(myfu)
      returnCount(myfu, 2)
      returnType(myfu, 'String')
    },

    'type transforms': function () {
      var ast = xform('type-transforms')
      var a = findFunction('a', ast)

      var nodes = getReturns(a)

      fu.zipWith(
        assert.equal,
        fu.concatMap(function (ret) {
          return fu.map(
            fu.property('name'),
            ret.argument.arguments[0].arguments[0].elements
          )
        }, nodes),
        ['String', 'Number']
      )
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
