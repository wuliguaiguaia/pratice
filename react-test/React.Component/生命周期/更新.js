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

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextState);
    return true
  }

  render() {
    console.log('render');
    return (
      <div>
        {this.state.a}
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