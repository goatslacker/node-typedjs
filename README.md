# node-typedjs

[![Build Status](https://secure.travis-ci.org/goatslacker/node-typedjs.png)](http://travis-ci.org/goatslacker/node-typedjs)

This is the [TypedJS](http://typedjs.com) module for node.js

TypedJS lets you annotate your JavaScript functions with Haskell-like type signatures and then runs a set of automated tests against those functions.

For more information visit the [TypedJS GitHub repo](https://github.com/Proxino/TypedJS)

## Install

In your project

    npm install typedjs

Globally to check all your projects

    npm install typedjs -g

## API

### Adding single tests and running them

    var typedjs = require('typedjs');
    typedjs.addTest('foo :: Number -> Number', function foo(n) {
      return n;
    });
    typedjs.runTests(); // will output to console.log

You can also use a callback if you prefer

    typedjs.runTests(function (data) {
      // the data that would've been passed to console.log
      // is sent here instead.
    });

### Running against a file

    var typedjs = require('typedjs');
    var path = require('path');
    typedjs.runTests(path.join(__dirname, 'myFile.js'), function (data) {
      // this is an optional callback
      // data will be sent to console.log by default.
    });

### Comes with an executable

    $ typedjs your_file.js

## Credits

* TypedJS - [Ethan Fast](http://ethanfast.com/)
* node-typedjs - [Josh Perez](http://www.goatslacker.com)

## License

[MIT-LICENSE](http://josh.mit-license.org)
