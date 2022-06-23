"use strict";

var _a = require("./a.js");

require("./b.js");

console.log(_a.a);
(0, _a.foo)();
console.log(_a.a); // ./node_modules/.bin/babel src --out-dir dist