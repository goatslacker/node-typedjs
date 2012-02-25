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

### Adding individual tests

You may add individual functions to run the automated tests on.

      var typedjs = require('typedjs');

      var tests = typedjs.createTests();

      tests.addTest('foo :: Number -> Number -> Number', function foo(a, b) {
        return a + b;
      });

      tests.run(); // Boolean. true if tests passed, else false.
      tests.data; // contains information on which functions passed and failed.

## Credits

* TypedJS - [Ethan Fast](http://ethanfast.com/)
* node-typedjs - [Josh Perez](http://www.goatslacker.com)

## License

[MIT-LICENSE](http://josh.mit-license.org)
