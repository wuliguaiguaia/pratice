"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arr = void 0;

require('@babel/register');

require('./main.js');

var arr = Array.from('foo');
exports.arr = arr;
console.log(arr); // [ 'f', 'o', 'o' ]
