var _$TypedJS = {
  typedjs: require('./packages/TypedJS/typed.js'),
  util: require('util'),

  signatures: {},

  // defines our type checking function
  args: function contractArgs(name, args) {
    var base = this.signatures[name];

    // If the type signature exists
    if (base) {
      base.args.forEach(function (arg, index) {
        // the last one is the Return
        if (index === base.args.length - 1) {
          return;
        }

        // Check the Type
        if (!this.typedjs.check_type(args[index], arg)) {
          throw new TypeError(name + ': Expected ' + this.util.inspect(arg) + ' but received ' + this.util.inspect(args[index]));
        }
      });
    }
  },

  ret: function contractReturn(name, value) {
    var base = this.signatures[name];
    var expected;

    if (base) {
      expected = base.args[base.args.length - 1];

      // Check the Type
      if (!this.typedjs.check_type(value, expected)) {
        throw new TypeError(name + ': Expected ' + this.util.inspect(expected) + ' but received ' + this.util.inspect(value));
      }
    }

    // return back to function so program works correctly
    return value;
  }
};


module.exports = _$TypedJS;
