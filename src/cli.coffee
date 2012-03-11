typedjs = require '../'
util = require 'util'
fs = require 'fs'

params =
  key: {}
  value: {}

  get: (arg) ->
    params.value[arg]

  set: (m, a, d = false) ->
    params.key[m] = params.key[a] = params.value[a] = d

  notArg: (arg) ->
    arg = arg.replace /-/g, ''
    exist = params.value.hasOwnProperty arg
    params.value[arg] = true if exist
    not exist


params.set 'e', 'extract'


run = (tests, file) ->
  try
    result = tests.run()
  catch err
    result = false

  symbol = if result then '✓' else '✘'

  util.puts "#{file}: #{symbol}"
  result or (util.puts util.inspect tests.data)


parseFiles = (file) ->
  try
    stat = fs.statSync file
  catch err
    if err.code is 'ENOENT'
      return util.puts "#{file} not found."
    else
      throw e

  if not stat.isFile()
    return util.puts "#{file} is not a file."

  code = fs.readFileSync file
  tests = typedjs.createTests code.toString(), params.get 'extract'

  run tests, file


module.exports = (args) ->
  args.filter(params.notArg).forEach(parseFiles)
  util.puts 'Done.'
