/**
 *  高级类型
 */


// 1、Record：将一个类型的所有属性值都替换为另一个类型，返回一个新的类型
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

// K中的所有属性值都转换为T类型，并将返回的新类型返回给proxyKType，K可以是联合类型、对象、枚举…
// type proxyKType = Record<K, T>


const arrayInstrumentations: Record<string, Function> = {};
['indexOf', 'lastIndexOf', 'includes'].forEach(key => {
  const method = Array.prototype[key];
  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    return args
  }
})