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

15、setTimeout 返回的类型是 number
let timer: number = 0
类型会被清除，因为ts有类型推断，可以不用写

16、KeyboardEvent 使用原生类型，不要使用 React 的，否则会有以下错误
const handleKeyDown: (e: KeyboardEvent) => void
没有与此调用匹配的重载。
  第 1 个重载(共 2 个)，“(type: "keydown", listener: (this: Window, ev: KeyboardEvent) => any, options?: boolean | AddEventListenerOptions | undefined): void”，出现以下错误。
    类型“(e: KeyboardEvent) => void”的参数不能赋给类型“(this: Window, ev: KeyboardEvent) => any”的参数
      参数“e”和“ev” 的类型不兼容。
        类型“KeyboardEvent”缺少类型“KeyboardEvent<Element>”中的以下属性: locale, nativeEvent, isDefaultPrevented, isPropagationStopped, persist
  第 2 个重载(共 2 个)，“(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void”，出现以下错误。
    类型“(e: KeyboardEvent) => void”的参数不能赋给类型“EventListenerOrEventListenerObject”的参数。
      不能将类型“(e: KeyboardEvent) => void”分配给类型“EventListener”。
        参数“e”和“evt” 的类型不兼容。
          类型“Event”缺少类型“KeyboardEvent<Element>”的以下属性: altKey, charCode, ctrlKey, code 及其他 15 项


17、scroll 的event不是mouseEvent，是Event
scorll handler 不能使用原生的 mouseEventhandler

使用any就可以
```js
export const throttle = (cb: { (e: any): void}, time: number) => {
  return (e: any) =>  cb(e)
}

const throttleScroll = throttle(handleScroll, 0)
window.addEventListener('scroll', throttleScroll)
```
推导的类型：const throttleScroll: (e: any) => void

但是使用 MouseEvent 就不行

```js
export const throttle = (cb: { (e: MouseEvent): void}, time: number) => {
  return (e: MouseEvent) =>  cb(e)
}
```
const throttleScroll: (e: MouseEvent) => void
没有与此调用匹配的重载。
  第 1 个重载(共 2 个)，“(type: "scroll", listener: (this: Window, ev: Event) => any, options?: boolean | EventListenerOptions | undefined): void”，出现以下错误。
    类型“(e: MouseEvent) => void”的参数不能赋给类型“(this: Window, ev: Event) => any”的参数。
      参数“e”和“ev” 的类型不兼容。
        不能将类型“Event”分配给类型“MouseEvent”。
  第 2 个重载(共 2 个)，“(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void”，出现以下错误。
    类型“(e: MouseEvent) => void”的参数不能赋给类型“EventListenerOrEventListenerObject”的参数。
      不能将类型“(e: MouseEvent) => void”分配给类型“EventListener”。ts(2769)


18、类型“Element”上不存在属性“offsetTop”
```js
const titles: HTMLCollectionOf<Element> = articleContent.current.getElementsByClassName('_artilce-title') || []
Array.from(titles).forEach(el => {
  offsetArr.push(el.offsetTop + headerPadding + wrapperTop)
})
```
typescript的类型检查导致, 需要进行类型断言
const titles = articleContent.current.getElementsByClassName('_artilce-title') as  HTMLCollectionOf<HTMLElement>


19、Type error: Property 'dataset' does not exist on type 'EventTarget'.
element 上没有 dataset 属性，需要做类型断言
```js
const handleClick: MouseEventHandler = (e) => {
  const target = e.target as HTMLElement
  const dataset = target.dataset
}
```

20、此表达式不可调用。类型 "Promise<any>" 没有调用签名
```js
  const { data } = await $http.getarticle(params)
```
