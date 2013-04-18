fs            = require 'fs'
{print}       = require 'util'
{spawn, exec} = require 'child_process'

# ANSI Terminal Colors
green = '\x1b[0;32m'
reset = '\x1b[0m'
red = '\x1b[0;31m'

log = (message, color, explanation) ->
  console.log color + message + reset + ' ' + (explanation or '')

build = (watch, callback) ->
  if typeof watch is 'function'
    callback = watch
    watch = false
  options = ['-c', '-o', 'lib', 'src']
  options.unshift '-w' if watch

  coffee = spawn 'coffee', options
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> log data.toString(), red
  coffee.on 'exit', (status) -> callback?() if status is 0

test = (callback) ->
  options = ['--spec']
  spec = spawn 'vows', options
  spec.stdout.on 'data', (data) -> print data.toString()
  spec.stderr.on 'data', (data) -> log data.toString(), red
  spec.on 'exit', (status) -> callback?() if status is 0


task 'docs', 'Generate annotated source code with Docco', ->
  fs.readdir 'src', (err, contents) ->
    files = ("src/#{file}" for file in contents when /\.coffee$/.test file)
    docco = spawn 'docco', files
    docco.stdout.on 'data', (data) -> print data.toString()
    docco.stderr.on 'data', (data) -> log data.toString(), red
    docco.on 'exit', (status) -> callback?() if status is 0


task 'build', ->
  build -> log ":)", green

task 'test', 'Run Vows', ->
  build -> test -> log ":)", green
