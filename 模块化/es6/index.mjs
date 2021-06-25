import { counter, incCounter } from './a.mjs';
console.log(counter); // 3
incCounter();
console.log(counter); // 4 // commonjs是3

# node 环境运行es6：
1、package.json 配置 "type": "module"
2、文件后缀.mjs