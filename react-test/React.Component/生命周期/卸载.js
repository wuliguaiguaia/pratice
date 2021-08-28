/* 
  卸载
    当组件从 DOM 中移除时会调用如下方法：
      componentWillUnmount()
 */

class Children extends React.Component {
  state = {
    a: 1
  }

  render() {
    return (
      <div>
        {this.state.a}
      </div>
    )
  }
  componentWillUnmount() {
    /* componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，
    例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。 */
    console.log('componentWillUnmount child');

  }
}

class Test extends React.Component {
  state = {
    a: 1,
    show: true
  }

  constructor() {
    super()
    this._onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <div>
        <button onClick={this._onClick}>click</button>
        {this.state.a}
        {this.state.show ? <Children/> : null}
      </div>
    )
  }
}

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)