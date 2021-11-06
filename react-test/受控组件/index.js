class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  handleChange = (e)=> {
    let text = e.target.value
    this.setState((state)=>({
      text: text
    }))
  }
  render() {
    return <>
      <div>{this.state.text}</div>
      <input type="text" value={this.state.text} onChange={this.handleChange}/>
      <button onClick={this.getFocus}>获取焦点</button>
    </>
  }
}


ReactDOM.render(
  <Test/>,
  document.querySelector('#root')
)