# Automated tests

## Single tests

* Developer adds the tests by passing in the signature and the function to test
* And then chooses when to run the test

## Run a file

* Pass a filename and it will read it and run automated tests on it.

## Run a string

* Pass in a string and it will run the automated tests on it.

## Run a file (extract typed functions)

* Pass a filename and it will read it
* Extract all functions that have type signatures
* Run automated tests on them

## Run a string (extract typed functions)

* Pass string
* Extract all functions that have type signatures
* Run automated tests on them


# Contracts

Runs with unit tests or with other code

## String || Filename

* Will instrument your code
* Takes a runner function which will run the unit tests
* And a callback function when everything is complete
