let data0 = 11;
eval('data0 *= 2');
console.log(data0);

const data2 = 11;
const fn = new Function('data2', 'data2 *= 2; return data2');
const a = fn(data2);
console.log(a); // 22


const vm = require('vm');
const sandbox = {
  animal: 'cat',
  count: 2,
  data: 10
};
vm.createContext(sandbox)

//必须传入第二个参数，sandbox或context
vm.runInContext('data *= 3', sandbox);

console.log(sandbox)