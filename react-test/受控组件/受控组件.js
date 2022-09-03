// 用react中的state来控制 <input/> 、<select/>等可以理解为受控组件
// 页面中所有输入类的DOM如果是现用现取的称为非受控组件，
// 而通过setState将输入的值维护到了state中，需要时再从state中取出，这里的数据就受到了state的控制，称为受控组件。

// 处理多个输入可以使用 name

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return <>
      <input value={this.state.value} onChange={this.handleChange}></input>
    </>
  }
}

ReactDOM.render(
  <Parent/>,
  document.querySelector('#root')
)