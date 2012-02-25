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

## How to

### Add individual tests

You may add individual functions to run the automated tests on.

      var typedjs = require('typedjs');

      var tests = typedjs.createTests();

      tests.addTest('foo :: Number -> Number -> Number', function foo(a, b) {
        return a + b;
      });

      tests.run(); // Boolean. true if tests passed, else false.
      tests.data; // contains information on which functions passed and failed.

### Test a file

    var typedjs = require('typedjs');
    var fs = require('fs');

    // By passing the contents of a file as a String into createTests
    // you'll add the automated tests to all the global functions in the code.
    var tests = typedjs.createTests(fs.readFileSync('myfile.js').toString());
    tests.run();

### Dealing with closures

If you're testing a file the functions must be global otherwise TypedJS doesn't run
the automated tests on them.

Fortunately this module lets you deal with those closures under one condition, the
functions may not call other functions.

    var typedjs = require('typedjs');
    var fs = require('fs');

    var code = fs.readFileSync('myfile.js').toString();

    // the second parameter tells node-typedjs to extract all functions within
    // that have type signatures attached to them
    var tests = typedjs.createTests(code, true);
    tests.run();

### Contracts

Although the automated tests are great, coupling typedjs with your
unit tests to make sure the types are enforced at runtime is a great way
to spot new bugs and improve code quality.

    var typedjs = require('typedjs');
    var code = 'function concat(a, b) { return a + b; } //+ concat :: String -> String -> String';

    var tests = typedjs.enforce(code);

    tests.run(function (context) {
      context.concat(5, 2); // will fail
      context.concat('foo', 'bar'); // will pass
    });

    // you can also run it as a String
    tests.run('concat("hello", "world")');

## API

Automated tests are created by calling `createTests`

Contracts are created by calling `enforce`

### createTests(code, extract)

* code - {String} optional piece of code to run automated tests against
* extract - {Boolean} if true node-typedjs will extract all functions and run them individually

### enforce(code)

* code - {String} enforce a contract on some code

## Credits

* TypedJS - [Ethan Fast](http://ethanfast.com/)
* node-typedjs - [Josh Perez](http://www.goatslacker.com)

## License

[MIT-LICENSE](http://josh.mit-license.org)
