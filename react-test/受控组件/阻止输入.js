// 用react中的state来控制 <input/> 、<select/>等可以理解为受控组件
// 受控组件上指定 value 的 prop 会阻止用户更改输入 --- 顺便传个函数进来，调父组件的函数
// 处理多个输入可以使用 name

class Test extends React.Component {
  render() {
    return <>
      {this.props.value}
      <input type="text" value={this.props.value} onChange={this.props.handleChange}/>
    </>
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: 123}
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return <>
      <Test value={this.state.value} handleChange={ this.handleChange }></Test>
    </>
  }
}

ReactDOM.render(
  <Parent/>,
  document.querySelector('#root')
)