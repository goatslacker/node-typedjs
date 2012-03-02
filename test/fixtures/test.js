//+ my_prop :: {name:String, valid:Boolean} -> Boolean
function my_prop(obj) {
  if (obj.valid === true) {
    return false;
  } else {
    return obj.valid;
  }
}

//+ fullname :: {first:String, last:String} -> String
function fullname(obj) {
  return obj.first + " " + obj.last;
}

//+ test_or :: {name:String, email:String} -> {name:String, email:String} | Boolean
function test_or(o) {
  if (Math.round(Math.random()) === 0) {
    return { name: "Etan", email: "ok" };
  }
  else {
    return true;
  }
}

//+ test_arr :: String | Number -> String -> [String | Number]
var test_arr = function (s1, s2) {
  return [s1, s2];
};

var MyObj = {
  //+ MyObj.test_fun :: Number, Number -> Number
  test_fun: function (num1, num2) {
    return num1 + num2;
  }
};

//+ add_tos :: Number -> Number -> String
function add_tos(n1, n2) {
  return (n1 + n2) + "";
}
