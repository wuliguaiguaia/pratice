require('./a');
let b = require('./b');
b = 1;
console.log(b); // 输出值拷贝

// commonjs 支持 .cjs 后缀