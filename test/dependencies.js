var esprima = require('esprima')
var fs = require('fs')
var path = require('path')
var traverse = require('../lib/traverse')
var typedjs = require('../')

module.exports = {
  typedjs: typedjs,
  fu: require('fu'),
  filter: function (nodes, f) {
    return traverse(nodes, function (node) {
      return f(node) ? node : null
    })
  },
  xform: function (name) {
    var code = fs.readFileSync(path.join(__dirname, 'fixtures', name + '.js'))
    return esprima.parse(typedjs.transform(String(code)))
  }
}
