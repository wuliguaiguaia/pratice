/**
 * 关键字: keyof
 * 获取某种类型的所有键，其返回类型是联合类型。
 */

{
  interface Person {
    name: string;
    age: number;
    location: string;
  }

  type K1 = keyof Person; // "name" | "age" | "location"
  type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
  type K3 = keyof { [x: string]: Person };  // string | number

  // keyof 操作符除了支持接口和类之外，它也支持基本数据类型：
  let K1: keyof boolean; // let K1: "valueOf"
  let K2: keyof number; // let K2: "toString" | "toFixed" | "toExponential" | ...
  let K3: keyof symbol; // let K1: "valueOf"

  
  function fn1<T, K extends keyof T>(obj: T, keys: Array<K>): T[K][] {
    // K 的 类型是 T 的属性名字面量
    // T[K][]: T[K] 表示 Person 的 key；后面[]表示是数组
    return keys.map(key => obj[key])
  }

  fn1({ name: 'we', age: 13, location: 'nejing' }, ['name', 'age'])

}