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
type readonlyPersone = Partial<Persone3> // **Partial<Persone3> 是 Persone3的一部分**
let Vod: readonlyPersone = {
  name: 'ww'
}

/* 3、Required：与 Partial 相反，将一个对象的所有属性变成必选 */

type requirePerson = Required<readonlyPersone>
/* 
type Required<T> = {
    [P in keyof T]-?: T[P];
};
*/
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

/* 5、Pick: 获取部分 key，其他都不要 */
interface PersoneP {
  id: number;
  name: string;
  age: number
}

/* type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}; */
const god: Pick<PersoneP, 'name'|'id'> = {
  id: 1,
  name: '122',
}

/* 6、Omit: Pick的反向操作，不要部分 key，其他都要 */

/* 
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
 */
interface PersoneP {
  id: number;
  name: string;
  age: number
}

const god1: Omit<PersoneP, 'name' | 'id'> = {
  age: 1
}

/* 7、Exclude：排除类型，与 Pick/Omit的区别是：一个针对类型，一个针对key */
/* 8、ExTract：Exclude的反向操作，提取类型 */

type Dir = '东' | '南' | '西' | '北'

type Dir1 = Exclude<Dir, '东'>
type Dir2 = Extract<Dir, '东'>

/* 9、ReturnType */

function ff(a: number, b: number) {
  return a+b
}
type AA = ReturnType<typeof f> // number


/* 10、 Record, interface 或 type 的缩写，设定一个对象 key val的类型 */

/* type Record<K extends keyof any, T> = {
  [P in K]: T;
}; */

type b11 = keyof any // string | number | symbol

type a = Record<string, number>
// 等同于
type b = {
  [x:string]: number
}

type AA1 = Record<'id'|'age', string>

/* 11、ReturnType 获取函数返回值类型 */

function fn1():Promise<number> {
  return new Promise(r=>r(1))
}
type Fn1 = ReturnType<typeof fn1> // type Fn1 = Promise<number>
