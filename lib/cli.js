module.exports = cli

var fs = require('fs')
var path = require('path')
var typedjs = require('./')

function cli(files) {
  console.log(files.map(function (file) {
    return typedjs.transform(
      String(fs.readFileSync(path.resolve(process.env.PWD, file)))
    )
  }).join('\n'))
}
