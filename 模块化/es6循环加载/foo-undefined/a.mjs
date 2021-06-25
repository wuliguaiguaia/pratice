import { bar } from './b.mjs';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// node a.mjs
1. 执行 a.mjs 以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。
2. 执行 b.mjs 的时候，已知它从a.mjs输入了foo接口，（生成只读引用）这时不会去执行a.mjs，而是认为这个接口已经存在了
3. 执行到console.log(foo)的时候，才发现这个接口根本没定义，因此报错。

// 解决：
// 1、 将 foo 写成函数，因为有函数提升
// 1、 使用 var 声明，因为有变量提升

