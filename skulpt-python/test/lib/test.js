// var mod = Sk.importModule("mod", false, false);
// console.log(mod); // SuspensionError: Cannot call a function that blocks or suspends here on line 1
var $builtinmodule = function (name) {
  var test = { __name__: new Sk.builtin.str("test") }
  test.getValue = new Sk.builtin.func(function (arr, index) {
    return Sk.ffi.remapToPy(arr.v[index.v])
  });
  // test.getValue.co_name = new Sk.builtin.str('test');  // 
  // test.getValue.co_varnames = ['arr', 'index']
  // test.getValue.co_varnames = 2 // 参数数量
  // test.getValue.$defaults = []; // 默认参数
  // test.run2 = function () {
  //   // Sk.misceval.callsim(test)
  // }

  test.basicwrap = new Sk.builtin.func(function() {
    return Sk.ffi.basicwrap('123')
  });
  test.sleep = new Sk.builtin.func(function(delay) {
    return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
      Sk.setTimeout(function () {
            Sk.misceval.callsimAsync(null, Sk.globals.update);
            resolve(Sk.builtin.none.none$);
        }, Sk.ffi.remapToJs(delay)*1000);
    }));
  });

  test.run = new Sk.builtin.func(function () {
    Sk.misceval.callsim(Sk.globals.update, 1);
  })
  return test;
}