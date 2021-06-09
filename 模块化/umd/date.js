// umd规范:环境区分
(function (self, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if ( typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    self.umdModule = factory();
  }
}(this, function () {
  return +new Date();
}))