import { counter, incCounter } from './a.mjs';
console.log(counter); // 3
incCounter();
console.log(counter); // 4 // commonjs是3
