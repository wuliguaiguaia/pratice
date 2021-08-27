/* 
  component.forceUpdate(callback)

  默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。
  如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。
  
  此操作会跳过该组件的 shouldComponentUpdate()。
 */

class Test extends React.Component {
  name = 1
  componentDidMount() {
    this.name = 2

    this.forceUpdate(() => {
      console.log(23423432432);
    })
  }
  
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
  }

  render() {
    return <div>
      {this.name}
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)