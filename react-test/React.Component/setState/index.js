// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17
// 第 18 题：React 中 setState 什么时候是同步的，什么时候是异步的？ #17

/*
  改变state属于同步异步？
    由React控制的事件处理程序，以及生命周期内调用setState是异步更新state
    React控制之外的事件中调用setState是同步更新state，比如原生js绑定事件、setTimeout/setInrerval等。

    异步操作是为了提高性能，将多个状态合并一起更新，减少re-render调用。
    可以使用回调获取异步更新后的数据


    setState() 并不总是立即更新组件。它会批量推迟更新。这使得在调用 setState() 后立即读取 this.state 成为了隐患。
    为了消除隐患，请使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)），
    这两种方式都可以保证在应用更新后触发。
    
    如需基于之前的 state 来设置当前的 state，请阅读下述关于参数 updater 的内容。

    setState((state, props) => stateChange, callback)
    第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行。通常，我们建议使用 **componentDidUpdate()**来代替此方式。
 */
class Test extends React.Component {
  state = { number: 0 }
  componentDidMount() {
    document.querySelector('#btn').addEventListener('click', () => {
      this.setState({ number: this.state.number + 10 })
      this.setState({ number: this.state.number + 10 })
      console.log(this.state.number);
    })
  }
  render() {
    return <div>
      {this.state.number}
      <button id="btn">click</button>
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)