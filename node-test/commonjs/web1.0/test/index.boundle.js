
const map = {"./moduleB":function(require, module, exports) {module.exports = 1;},"./moduleA":function(require, module, exports) {module.exports = require('./moduleB')}}

function require(id) {
  const module = map[id]
  const _Module = { exports: {} }
  module(require, _Module, _Module.exports)
  return _Module.exports
};
(function(require, module, exports) {
const a = require('./moduleA')
// const b = require('./moduleA.js')
console.log(a);
})(require)
