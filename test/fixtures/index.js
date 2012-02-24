var fs = require('fs');
var path = require('path');

function file(name) {
  return fs.readFileSync(path.join(__dirname, name + '.js'), 'utf-8');
}

function files(obj) {
  Object.keys(obj).forEach(function (key) {
    var f = obj[key];
    obj[key] = file(f);
  });

  return obj;
}

module.exports = files({
  str: 'test',
  no_sig: 'no_signatures',
  failing: 'failing',
  closures: 'closures'
});
