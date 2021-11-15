/* 类型别名 */
type Layout = React.FunctionComponent & { header: React.FunctionComponent } 

const Layout: Layout = () => {
  return React.createElement('div')
}
Layout.header = () => {
  return React.createElement('div')
}
/* 也可以使用 interface 继承 */
interface ILayout extends React.FunctionComponent {
  header: React.FunctionComponent
}
