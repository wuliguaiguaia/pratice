var $builtinmodule = function (name) {
  var mod = {__name__: new Sk.builtin.str("mod")}
  mod.add = new Sk.builtin.func(function(a, b) {
    return Sk.ffi.remapToJs(a) + Sk.ffi.remapToJs(b);
  });
  return mod;
}