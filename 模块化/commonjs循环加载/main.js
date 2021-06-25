var a = require('./a.js');
var b = require('./b.js'); // 不会执行，输出缓存的b.js的执行结果
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// 在 main.js 之中, a.done = true, b.done = true