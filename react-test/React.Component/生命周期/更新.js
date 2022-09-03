/* 更新
  当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
    static getDerivedStateFromProps()
    shouldComponentUpdate()
    render()
    getSnapshotBeforeUpdate()
    componentDidUpdate() 
*/

class Test extends React.Component {
  state = {
    a: 1
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.setState({
      a: 2
    })
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
    return {
      b: 2
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 性能优化：根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。

    // 此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。
    // 你应该考虑使用内置的 PureComponent?? 组件，而不是手动编写 shouldComponentUpdate()

    // PureComponent(https://github.com/BigSharkLx/front-end-interview/blob/main/7%20offer%E6%94%B6%E5%89%B2%E6%9C%BA%E4%B9%8BReact%E7%AF%87.md#6-reactcomponent-%E5%92%8C-reactpurecomponent-%E7%9A%84%E5%8C%BA%E5%88%AB)

    console.log('shouldComponentUpdate', nextProps, nextState);
    return true
    // 返回 false 并不会阻止子组件在 state 更改时重新渲染
  }

  render() {
    console.log('render');
    return (
      <div>
        {this.state.a}
        <hr/>
        {this.state.b}
      </div>
    )
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。
    // 此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()
    console.log('getSnapshotBeforeUpdate', prevState);
    return 123;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevState, snapshot);
  }
}

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)