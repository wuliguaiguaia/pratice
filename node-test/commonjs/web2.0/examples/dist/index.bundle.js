(function (self) {
  const moduleList = [function(require, module, exports) {

require('./src/index.js');
},function(require, module, exports) {
"use strict";

var _a = require("./moduleA.js");

require("./moduleB.js");

console.log(_a.a);
(0, _a.foo)();
console.log(_a.a); // ./node_modules/.bin/babel src --out-dir dist
},function(require, module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.foo = exports.a = void 0;
let a = 1;
exports.a = a;

let foo = () => {
    exports.a = a = a + 1;
};

exports.foo = foo;
},function(require, module, exports) {
"use strict";

var _a = require("./moduleA.js");

console.log(_a.a);
(0, _a.foo)();
console.log(_a.a);
}]
  const moduleDepMapList = [
  {
    "./src/index.js": 1
  },
  {
    "./moduleA.js": 2,
    "./moduleB.js": 3
  },
  {},
  {
    "./moduleA.js": 2
  }
]
  const cache = {}

  require(0)
  function require(id, parentId) {
    const currentModuleId = typeof parentId === 'number' ? moduleDepMapList[parentId][id] : id
    if(cache.hasOwnProperty(currentModuleId)) return cache[currentModuleId]
    const module = moduleList[currentModuleId]
    const _Module = { exports: {} }
    module((function(parentModuleId){
      return function(curId) {
        return require(curId, parentModuleId)
      }
    })(currentModuleId), _Module, _Module.exports)
    cache[currentModuleId] = _Module.exports
    return cache[currentModuleId]
  };
})(this)