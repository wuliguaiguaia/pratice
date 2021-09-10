const moduleDepMapList = [
  {},
  {
    "./moduleB": 0
  },
  {},
  {
    "./moduleA": 2
  },
  {
    "./moduleA": 1,
    "./src/index": 3
  }
]
const moduleList = [function(require, module, exports) {
console.log('module B');
module.exports = Date.now()

},function(require, module, exports) {
const b = require('./moduleB')
console.log(b);
console.log('module A');
},function(require, module, exports) {
module.exports = 'another moduleA'
},function(require, module, exports) {
const a = require('./moduleA')
console.log(a, 'another index');
},function(require, module, exports) {
const a = require('./moduleA')
console.log(a);

require('./src/index')
}]


require(moduleList.length - 1)
function require(id, parentId) {
  const currentModuleId = parentId ? moduleDepMapList[parentId][id] : id 
  const module = moduleList[currentModuleId]
  const _Module = { exports: {} }
  module((function(parentModuleId){
    return function(curId) {
      return require(curId, parentModuleId)
    }
  })(currentModuleId), _Module, _Module.exports)
  return _Module.exports
};