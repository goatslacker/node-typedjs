(function () {
  //+ join_char :: String -> String -> String
  function join_char(c1, c2) {
    return c1;
  }

  //+ concat_to_str :: String -> String
  function concat_to_str(str) {
    var a = join_char('foo', 'bar');
    return a + str;
  }
}());
