var $builtinmodule = function (name) {
  var mod = { __name__: new Sk.builtin.str("mod") }
  mod.run2 = new Sk.builtin.func(function () {
    print('1')
  })
  return mod;
}