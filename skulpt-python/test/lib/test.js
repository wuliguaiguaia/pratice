var $builtinmodule = function (name) {
  var test = {__name__: new Sk.builtin.str("test")}
  test.add = new Sk.builtin.func(function (a, b) {
    return Sk.ffi.unwrapo(a)
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