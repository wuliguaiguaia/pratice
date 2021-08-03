class Good extends React.Component{
  render() {
    return <div>good,{ this.props.name }</div>
  }
}

class Bad extends React.Component {
  render() {
    return <div>Bad,{this.props.name}</div>
  }
}


/* 定义高阶组件 */
const wrapWithUsername = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      name: ''
    }

    componentWillMount() {
      let username = localStorage.getItem("myName");
      console.log(username);
      this.setState({
        name: username,
      });
    }

    render() {
      return <WrappedComponent name={this.state.name} {...this.props}></WrappedComponent>
    }
  }
}

// 使用
const BadCom = wrapWithUsername(Bad)
const GoodCom = wrapWithUsername(Good)

ReactDOM.render(
  <div>
    <BadCom></BadCom>
    <GoodCom></GoodCom>
  </div>,
  document.querySelector('#root')
)
