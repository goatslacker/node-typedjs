var typedjs = require('../index');

var fs = require('fs');
var vm = require('vm');

var code = fs.readFileSync('./examples/test.js', 'utf-8');
var tests = "fullname({ first: 'Josh', last: 'Perez' }); fullname(12);";

var context = typedjs.contracts(code);
vm.runInNewContext(tests, context);
