/* 类型别名 */
// type Layout = React.FunctionComponent & { header: React.FunctionComponent } 

// const Layout: Layout = () => {
//   return React.createElement('div')
// }
// Layout.header = () => {
//   return React.createElement('div')
// }

/* 也可以使用 interface 继承 */
// interface ILayout extends React.FunctionComponent {
//   header: React.FunctionComponent
// }


const a11 = [1, 2, 3]
type A11 = typeof a11 // number[]

const b1 = [1,2,3] as const  
type A2 = typeof a11 //readonly [1,2,3]
const o11:A2 = [3, 4, 5]

