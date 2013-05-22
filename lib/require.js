module.exports = requirer

var dune = require('dune')
var fs = require('fs')
var typedjs = require('./')

function requirer(file) {
  var code = String(fs.readFileSync(file))
  var transformed = typedjs.transform(code)
  return dune.string(transformed, file)
}
