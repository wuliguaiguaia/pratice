/* eslint-disable */

// noImplicitAny": true, // 不能写any
const qaw = (a: string, b: string):string[] => {
    return [a + b, a + b + 'ew']
}

console.log(qaw('1', '2'));

const aaaa:string[] = qaw.filter((item:string)=> item === '12ew')


// 看报错的对象
// 1、使用泛型
// 2、使用断言