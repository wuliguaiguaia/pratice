"use strict";

require("core-js/modules/es6.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arr = void 0;

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.array.from.js");

require("core-js/modules/es6.string.iterator.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.array.iterator.js");

require("core-js/modules/web.dom.iterable.js");

require("./fdfsdfsd");

require('@babel/register');

var arr = Array.from('foo');
exports.arr = arr;
console.log(arr); // [ 'f', 'o', 'o' ]
