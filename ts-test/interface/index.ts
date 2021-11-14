/* 描述一个对象必须有什么属性（包括方法） */

// 函数接口参数名无所谓的
interface fn {
  (a: number, b: number): number
}

let f: fn = (q, w) => {
  return q
}
console.log(f(1, 4));

// 如果函数接口有属性
interface 二则运算 {
  (a: number, b: number): number;
  逆运算(a: number, b: number): number;
}
let fn = (): 二则运算 => {
  let x: any = function (a: number, b: number): number {
    return a + b;
  };

  x.逆运算 = function (a: number, b: number): number {
    return a - b;
  };
  return x;
}

let add: 二则运算 = fn();

console.log(add(1, 2));



// 接口 *继承*
interface A {
  name: string
}

interface B {
  age: number
}

// 可继承多个
interface C extends A, B {
  color: string
}

let a: C = { name: 'd', age: 12, color: 'ddd' }

// 数组接口
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

interface Person {
  name: string;
  age?: number;
}

let job: Person = {
  name: 'fds'
}

console.log(job);
