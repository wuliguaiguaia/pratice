interface A {
  name: string;
  age: number;
}

interface B {
  name: string;
  score: number;
}

/* 且运算 必须同时满足 */
const aa: A & B = {
  name: 'fds',
  age: 18,
  score: 89
}

console.log(aa);

/* 应用：一个组件上用属性挂载了另一个组件 */
const Layout: React.FunctionComponent & { header: React.FunctionComponent } = () => {
  return React.createElement('div')
}
Layout.header = () => {
  return React.createElement('div')
}
/* 也可以使用 interface 继承 */
interface ILayout extends React.FunctionComponent {
  header: React.FunctionComponent
}

/* 或运算 */
const cc: A | B = {
  name: 'fsd',
  age: 18,
  // score: 28
}

/* 应用：合并选项，但不能完全隔离。 */


// function add(a: string | number, b: string | number) {
//   return a + b
// }

// 函数重载
function addq(a: string, b: string): string;
function addq(a: number, b: number): number;
function addq(a: any, b: any) {
  return a + b
}
 

const a1 = addq(1, 2)
const a2 = addq('1', 2)
const a3 = addq('1', '2')

