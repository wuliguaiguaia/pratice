class App extends React.Component<any, any> {
  handleClick2;

  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      title: " react study",
    };
    this.handleClick2 = this.handleClick1.bind(this);
  }

  handleClick1() {
    this.setState({
      num: this.state.num + 1,
    });
  }

  handleClick3 = () => {
    this.setState({
      num: this.state.num + 1,
    });
  };

  render() {
    return (
      <div>
        <h2>Ann, {this.state.num}</h2>
        {/* 在render函数里绑定this，由于bind会返回一个新函数, 所以每次父组件刷新都会导致子组件的重新刷新, 就算子组件的其他props没有改变。*/}
        <button onClick={this.handleClick1.bind(this)}>btn1</button>
        {/* 构造函数内绑定this, 每次父组件刷新的时候, 如果传递给子组件的其他props不变, 子组件就不会刷新。*/}
        <button onClick={this.handleClick2}>btn2</button>
        {/* 使用箭头函数, 每次都会生成一个新的箭头函数, 每次父组件刷新的时候, 如果传递给子组件的其他props不变, 子组件就不会刷新*/}
        <button onClick={() => this.handleClick1()}>btn3</button>
        {/* 使用类里定义的箭头函数, 和handleClick2原理一样, 但是比第二种更简洁 */}
        <button onClick={this.handleClick3}>btn4</button>
      </div>
    );
  }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('#root')
)