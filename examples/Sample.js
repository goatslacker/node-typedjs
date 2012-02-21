var typedjs = require('../lib/index');

var fs = require('fs');
//var vm = require('vm');

var code = fs.readFileSync('./examples/test.js', 'utf-8');
//var tests = "fullname({ first: 'Josh', last: 'Perez' }); fullname(12);";

//var context = typedjs.contracts(code);
//vm.runInNewContext(tests, context);

var tests = new typedjs.single();

var data = typedjs.extract(code, tests);
var result = tests.run();
console.log(result);
console.log(tests.data);
