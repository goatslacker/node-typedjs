//+ hello :: String -> String
function hello(x) {
  function foo() {
    return 'this should not be checked'
  }

  if (x.length > 5) {
    return 'this should be checked'
  } else {
    return 'and this one too'
  }
}
