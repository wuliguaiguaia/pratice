class Test extends React.Component {
  render() {
    return <>
      {this.props.value}
      <input type="text" value={this.props.value} onChange={this.props.handleChange} />
    </>
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 123 }
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return <>
      <Test value={this.state.value} handleChange={this.handleChange}></Test>
    </>
  }
}

ReactDOM.render(
  <Parent />,
  document.querySelector('#root')
)