(function () {
  //+ join_char :: String -> String -> String
  function join_char(c1, c2) {
    return c1;
  }

  //+ test_obj :: {name:String, email:String} -> {name:String, email:String}
  function test_obj(o) {
    return o;
  }

  function dontTypeCheckMe() {
    return true;
  }

  function sideEffects() {
    var f = dontTypeCheckMe();
    return f;
  }

  //+ mispelledfnname :: String -> String -> Number
  function mispelledfunctionname(a, b, c) {
    var d = a + b;
    return Number(d) - c;
  }
}());

//+ subtractMe :: Number -> Number -> Number
function subtractMe(a, b) {
  return a - b;
}
