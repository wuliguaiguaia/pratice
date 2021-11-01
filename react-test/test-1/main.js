class Test extends React.Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.state = {
      number: 1
    }
  }
  // react控制的事件处理程序：异步修改
  componentDidMount() {
    // this.setState({ number: 3 }, () => {
    //   console.log(this.state.number); // 3 // 使用回调获取异步更新后的数据
    // });
    this.setState({number: 3})
    console.log(this.state.number); // 1
  }
  change() {
    console.log(123);
  }
  /* react控制之外的，同步修改 */
  /* componentDidMount() {
    document.body.addEventListener('click', this.resetState, false);
  }

  resetState=()=> {
    this.setState({ number: 3 });
    console.log(this.state.number); // 3
  } */

  render() {
    return <div>
      <input value={this.state.value} onChange={this.change}></input>
    </div>
  }
}

ReactDOM.render(
  <Test value="222" ></Test >,
  document.querySelector('#root')
)