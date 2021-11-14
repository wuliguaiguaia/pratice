/**
 * 泛型：generics
 * 接受参数的类型
 * https://www.tslang.cn/docs/handbook/generics.html
 * 在定义函数，类，接口时，不预先执行具体的类型，而是在使用的时候再指定类型的一种特性
 */

// 1、 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// myIdentity，myIdentity1，myIdentity2，3 4 5 等效
let myIdentity: <T>(arg: T) => T = identity;

let myIdentity1: <T>(arg: T) => T = function (arg){
  return arg;
};

let myIdentity2: <U>(arg: U) => U = identity;

// 2、使用带有*调用签名*的对象字面量来定义泛型函数：
let myIdentity3: { <T>(arg: T): T } = identity;


console.log(identity(999));
console.log(myIdentity3(999));

// 3、 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let myIdentity4: GenericIdentityFn = identity;
console.log(myIdentity4(900));

// 4、把泛型参数当作整个接口的一个参数，接口里的其它成员也能知道这个参数的类型
interface GenericIdentityFn2<T> {
  (arg: T): T;
}

let myIdentity5: GenericIdentityFn2<number> = identity;
console.log(myIdentity5(200));

// 5、泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>(); // 可以直接new？
myGenericNumber.zeroValue = 0;

myGenericNumber.add = function (x, y) { return x + y; }; // 实现 add 方法
console.log(myGenericNumber.add(1,2));

/**
 * 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
 * 无法创建泛型枚举和泛型命名空间
 */

// 6、泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity({ length: 9 });

// 在泛型约束中使用类型参数 ???????
// function getProperty(obj: T, key: K) {
//   return obj[key];
// }

let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

function create<T>(c: { new(): T; }): T {
  return new c();
}

