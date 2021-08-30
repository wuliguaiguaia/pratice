/* 
  错误处理
    当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：
      static getDerivedStateFromError()
      componentDidCatch()
*/


class Children extends React.Component {
  state = {
    a: 1
  }

  render() {
    return (
      <div>
        {this.stated.a}
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
    show: true,
    hasError: false
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
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级  UI
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div>
        <button onClick={this._onClick}>click</button>
        {this.state.a}
        {this.state.show ? <Children /> : null}
      </div>
    )
  }
  static getDerivedStateFromError(error) {
    // 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
    return { hasError: true };
  }


  componentDidCatch(error, info) {
    console.log('--', error, info);
  }
}

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)