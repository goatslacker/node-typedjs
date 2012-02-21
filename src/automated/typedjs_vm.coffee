parser = require '../../packages/TypedJS/typedjs_parser.js'

vm = require 'vm'
fs = require 'fs'
path = require 'path'

typedjs = fs.readFileSync path.join(__dirname, '..', '..', 'packages', 'TypedJS', 'typed.js'), 'utf-8'

context = (
  typedjs_parser: parser
  window: {}
)

vm.runInNewContext typedjs, context


module.exports = context.TypedJS
