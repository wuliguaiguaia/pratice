const Module = require('./require.js');
const path = require('path');
Module._load(path.resolve(__dirname, './index.js'), null, true);
console.log(JSON.stringify(Module.cache, null, 2));