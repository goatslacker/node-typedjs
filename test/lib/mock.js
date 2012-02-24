var mock = {
  concat: {
    signature: 'concat :: String -> String -> String',
    fn: function concat(a, b) {
      return a + b;
    }
  },
  add: {
    signature: 'add :: Number -> Number -> Number',
    fn: 'function add(a, b) { return a + b }'
  },
  fullname: [
    '//+ fullname :: {first:String, last:String} -> String',
    'function fullname(obj) {',
    '  return obj.first + " " + obj.last;',
    '}'
  ].join('\n')
};

module.exports = mock;
