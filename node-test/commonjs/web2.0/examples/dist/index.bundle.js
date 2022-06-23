// const runtimeConfig = __runtimeConfig__
const moduleDepMapList = [
  {},
  {
    "./moduleB": 0
  },
  {},
  {},
  {
    "./moduleA.js": 3
  },
  {
    "./moduleA.js": 2,
    "./moduleB.js": 4
  },
  {
    "./moduleA": 1,
    "./src/index.js": 5
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
},function(require, module, exports) {
"use strict";

var _a = require("./moduleA.js");

require("./moduleB.js");

console.log(_a.a);
(0, _a.foo)();
console.log(_a.a); // ./node_modules/.bin/babel src --out-dir dist
},function(require, module, exports) {
// const a = require('./moduleA')
// console.log(a);

require('./src/index.js')
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