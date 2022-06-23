"use strict";

var _a = r("./moduleA.js");

r("./moduleB.js");

console.log(_a.a);
(0, _a.foo)();
console.log(_a.a); // ./node_modules/.bin/babel src --out-dir dist