/* 测试 map 与 weakmap 与 垃圾回收 */

/* 测试weakmap */ 
// 第一次手动清理垃圾以确保为最新状态，观察内存情况
global.gc();
console.log(`第一次垃圾回收，当前内存使用情况：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);
const wm = new WeakMap();

let key = {};
// 给 WeakMap实例 赋值一个 占领内存足够大的 键值对
wm.set(key, new Array(114514 * 19));
// 手动清理一下垃圾 观察内存占用情况
global.gc();
console.log(`第二次垃圾回收，当前内存使用情况：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);

// 此时把 key键 的引用进行断开，并观察内存占用情况
key = null;
// key = new Array();  
// 这种改变引用地址写法也可以引起 弱映射，因为引用地址不再是同块内存地址 WeakMap内对应的value也会被垃圾回收

global.gc();
console.log(`第三次垃圾回收，当前内存使用情况：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);


// node--expose - gc garbage.js
// 第一次垃圾回收，当前内存使用情况：1.52MB
// 第二次垃圾回收，当前内存使用情况：18.29MB
// 第三次垃圾回收，当前内存使用情况：1.69MB



/* 测试 map */
// 第一次手动清理垃圾以确保为最新状态，观察内存情况
global.gc();
console.log(
  `第一次垃圾回收，当前内存使用情况：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`
);
const m2 = new Map();

let key2 = {};
m2.set(key2, new Array(114514 * 19));
// 手动清理一下垃圾 观察内存占用情况
global.gc();
console.log(
  `第二次垃圾回收，当前内存使用情况：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB，
  当前Map的长度: ${m2.size}`
);

// 此时把 key键 的引用进行断开，并观察内存占用情况
key2= null;
global.gc();
console.log(
  `第三次垃圾回收，当前内存使用情况：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB，
  当前Map的长度: ${m2.size}`
);

// 清除Map所有键值对
m2.clear();

global.gc();
console.log(
  `第四次垃圾回收，当前内存使用情况：${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB，
  当前Map的长度: ${m2.size}`
);
// 第一次垃圾回收，当前内存使用情况：1.70MB
// 第二次垃圾回收，当前内存使用情况：18.30MB，当前Map的长度: 1
// 第三次垃圾回收，当前内存使用情况：18.30MB，当前Map的长度: 1
// 第四次垃圾回收，当前内存使用情况：1.70MB，当前Map的长度: 0



// 结论：Map所构建的实例是需要手动清理，才能被垃圾回收清除，
// 而WeakMap只要外部的引用消失，所对应的键值对就会自动被垃圾回收清除。