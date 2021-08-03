class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }

    this.timer = setInterval(() => {
      this.setState({ value: this.state.value + 1 })
    }, 1000);
  }


  componentDidMount() {
    // this.setState({ value: this.props.value })

  }

  change(e, value) {
    this.setState({ value: e.target.value })
  }

  render() {
    return <div>
      <input value={this.state.value} onChange={(e) => { this.change(e) }}></input>
    </div>
  }
}

ReactDOM.render(
  <Test value="222" ></Test >,
  document.querySelector('#root')
)