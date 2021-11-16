/**
 *  高级类型
 */

/* 1、Readonly： 可以把一个类型的所有字段变成只读的 */

interface Persone {
  readonly name: string,
  readonly age: number
}

interface Persond {
  name: string,
  age: number
}
/* type Readonly<T> = {
    readonly [P in keyof T]: T[P]; // 遍历
}; */
type Persond2 = Readonly<Persond>
let Bob2: Persone = {
  name: 'adv',
  age: 1
}
Bob2.name = 'ew'

/* 2、Partial：将一个对象的所有属性变成可选 */

interface Persone2 {
  name?: string;
  age?: number
}

interface Persone3 {
  name: string;
  age: number
}
/* type Partial<T> = {
  [P in keyof T]?: T[P];
}; */
type readonlyPersone = Partial<Persone3>
let Vod: readonlyPersone = {
  name: 'ww'
}

/* 3、Required：将一个对象的所有属性变成必选 */

type requirePerson = Required<readonlyPersone>
let Vod2: requirePerson = {}




/* 4、Record：将一个类型的所有属性值都替换为另一个类型，返回一个新的类型 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// K中的所有属性值都转换为T类型，并将返回的新类型返回给proxyKType，K可以是联合类型、对象、枚举…
// type proxyKType = Record<K, T>


const arrayInstrumentations: Record<string, Function> = {};
['indexOf', 'lastIndexOf', 'includes'].forEach(key => {
  const method = Array.prototype[key];
  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    return args
  }
})