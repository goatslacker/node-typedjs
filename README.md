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

    var TypedJS = require('typedjs');
    var typedjs = new TypedJS();
    typedjs.add('foo :: Number -> Number', function foo(n) {
      return n;
    });
    var result = typedjs.run(); // returns Boolean

### Running against a file

    var TypedJS = require('typedjs');
    var typedjs = new TypedJS();
    var path = require('path');
    typedjs.file(path.join(__dirname, 'myFile.js')); // will load tests from the file
    typedjs.run();

    console.log(typedjs.data); // holds data of which functions failed and which passed.

### Comes with an executable

    $ typedjs your_file.js

## Credits

* TypedJS - [Ethan Fast](http://ethanfast.com/)
* node-typedjs - [Josh Perez](http://www.goatslacker.com)

## License

[MIT-LICENSE](http://josh.mit-license.org)
