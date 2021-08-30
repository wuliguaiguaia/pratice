/* 挂载
  当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：
    constructor()
    static getDerivedStateFromProps()
    render()
    componentDidMount() 
*/


class Test extends React.Component {
  state = {
    a: 1
  }
  constructor() {
    super()
    /* 
      构造函数仅用于以下两种情况：
      1、通过给 this.state 赋值对象来初始化内部 state。
      2、为事件处理函数绑定实例 
    */
    // 在 constructor() 函数中不要调用 setState() 方法

    // 要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 componentDidMount 中。
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
    return {
      b:2
    }
  }

  render() {
    console.log('render');
    /* 
      当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：

      1\React 元素。通常通过 JSX 创建。例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件，
        无论是 <div /> 还是 <MyComponent /> 均为 React 元素。
      2\数组或 [fragments](https://zh-hans.reactjs.org/docs/fragments.html)。 
        使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 fragments 文档。
      3\Portals。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 portals 的文档
      4\字符串或数值类型。它们在 DOM 中会被渲染为文本节点
      5\布尔类型或 null。什么都不渲染。（主要用于支持返回 test && <Child /> 的模式，其中 test 为布尔类型。) 
    */
    return (
      /* React.Fragment */
      <>
        <h1>fdsfsdf</h1>
        <div ref={el => this.el = el}>
          {this.state.a}
          <hr />
          {this.state.b}
        </div>
      </>


    )
  }

  componentDidMount() {
    // 会在组件挂载后（插入 DOM 树中）立即调用
    // 依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。
    console.log('componentDidMount');
  }

}
ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)