class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  componentDidMount() {
  }

  change = () => {
    this.setState({count: this.state.count+1})
  }

  render() {
    return <div>
      {this.state.count}
      <button onClick={this.change}>click</button>
    </div>
  }
}

console.log(React);

ReactDOM.render(
  <Test></Test >,
  document.querySelector('#root')
)