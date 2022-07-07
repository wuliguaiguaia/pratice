const Module = require('./require.js');
const path = require('path');
Module._load(path.resolve(__dirname, './index.js'), null, true);
console.log(Module.cache);