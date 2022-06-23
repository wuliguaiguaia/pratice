"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = exports.a = void 0;
let a = 1;
exports.a = a;

let foo = () => {
  exports.a = a = a + 1;
}; // export {a, foo};


exports.foo = foo;