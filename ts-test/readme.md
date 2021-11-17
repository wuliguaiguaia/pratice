# 🚀

1、自动新增 webpack.config.js 文件
npx webpack init
webpack5 可正常运行

2、写页面必须加 webpack-dev-server 开启本地服务， html-webpack-plugin 增加html或者使用模板

3、webpack 支持 vue，vue-loader，并且增加 plugin，此外还有一个 vue-template-compiler编译.vue文件

4、支持ts：安装ts-loader typescript，增加alias

4、Cannot find module './App.vue'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?
增加vue类型声明文件 ?????????

5、.vscode 配置ts-node 位置   which  ts-node

6、react 项目搭建支持 typescript
npx create-react-app react-demo --template typescript

react 是 facebook，最好看 facebook提供的教程

cli安装的东西无法使用，webbpack版本的问题，必须增加 .env 逃过检测

7、eslint 对ts 错误无提示？
修改编辑器配置

```setting.json
  "typescript.validate.enable": true,
```

8、以下写法一样, 一般优先使用接口
（interface 的类型以 I 开始）
interface IProps {
  size: string
}

type IProps = {size: string}

9、jsx 中的 花括号

```js
  return <button className={`${size}`}>click</button>
```

是用来分割 js 代码 和 jsx 代码的

10、ts：根据错误写代码法:::

11、使用react提供的类型 FunctionComponent

```old
type IProps = {
  size?: string,
  children?: string | JSX.Element | JSX.Element[] 
}
export default function Button(props: IProps) {}
```

```new
type IProps = {
  size?: string
}

const Button: React.FunctionComponent<IProps> = (props) =>{
  const { size, children } = props
  return <button className={`${size}`}>
    {children}
  </button>
}
export default Button
```

可以在类型声明文件里看到

```ts
interface FunctionComponent<P = {}> { // 泛型可传参
  // 表明是一个函数接口
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

12、使用react提供的类型 React.MouseEventHandler

```new
type IProps = {
  size?: string,
  onclick: React.MouseEventHandler
}
```

13、类组件的props和state类型：可以在 React.Component后面加泛型，如 React.Component<IProps, IState>

14、加感叹号表示确定不是 undefined，这种情况一般可以用断言代替

this.setState({data: this.props.size! + 1})

比如有默认props时，组件没有传参的情况