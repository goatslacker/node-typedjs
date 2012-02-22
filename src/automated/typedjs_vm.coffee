parser = require '../../packages/TypedJS/typedjs_parser.js'

vm = require 'vm'
fs = require 'fs'
path = require 'path'

typedjs = fs.readFileSync path.join(__dirname, '..', '..', 'packages', 'TypedJS', 'typed.js'), 'utf-8'


createVM = (code) ->
  window = {}

  if code
    vm.runInNewContext code, window

  context = (
    typedjs_parser: parser
    window: window
  )

  vm.runInNewContext typedjs, context

  context.TypedJS


module.exports = createVM
