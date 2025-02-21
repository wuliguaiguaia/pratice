/* 
    typeof 操作符可以用来获取一个变量或对象的类型。
    包括函数类型
*/

// 数组
const aqq = [1,2,4]
type x = typeof aqq
const bqq:x = []
// const bqq: number[]
console.log(bqq);

const aqq1 = {
    a:1,
    b: 'hello'
}
type x1 = typeof aqq1
const bqq2:x1 = []
/* 
const bqq2: {
    a: number;
    b: string;
} */


const COLORS = {
    red: 'red',
    blue: 'blue'
  }
  
  // 首先通过typeof操作符获取Colors变量的类型，然后通过keyof操作符获取该类型的所有键，
  // 即字符串字面量联合类型 'red' | 'blue'
  type Colors = keyof typeof COLORS 
  let color: Colors;
  // type Colors = "red" | "blue"
  color = 'red' // Ok
  color = 'blue' // Ok
  
  // Type '"yellow"' is not assignable to type '"red" | "blue"'.
  color = 'yellow' // Error

