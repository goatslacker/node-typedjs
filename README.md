# node-typedjs

[![Build Status](https://secure.travis-ci.org/goatslacker/node-typedjs.png)](http://travis-ci.org/goatslacker/node-typedjs)

TypedJS lets you annotate your JavaScript functions with Haskell-like type signatures and then transforms your code to perform type checking at run time.

## Install

    npm install typedjs

## Usage


### Transform your code

#### In your project

    var typedjs = require('typedjs')
    var fs = require('fs')
    var code = fs.readFileSync('file_name.js')
    var transformedCode = typedjs.transform(code)

#### From the CLI

    typedjs file_name.js > output_file.js


### Quickcheck your code

    var typedjs = require('typedjs')

    function addOne(n) {
      return n + 1
    }

    typedjs.quickcheck('Number -> Number', addOne)


### Using require

You can use `typedjs.require()` in your node programs to transform a file
and require it.

This is useful for your unit tests or your dev environments.

    var typedjs = require('typedjs')
    var someModule = typedjs.require('someModule')

    // you can then use `someModule` just as you would if you would've imported
    // it using Node's `require`
    someModule.aFunction()

## License

[MIT-LICENSE](http://josh.mit-license.org)
