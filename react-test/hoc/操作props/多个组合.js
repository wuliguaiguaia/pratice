class Good extends React.Component {
  render() {
    return <div>good,{this.props.name}</div>
  }
}

/* 高阶函数1 传入name */
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

/* 高阶函数2 height */
const wrapWithUserHeight = (height) => {
  return (WrappedComponent) => {
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
        return <div>
          height：{height}
          <WrappedComponent  {...this.props}></WrappedComponent>
        </div>
      }
    }
  }
}

// 使用
const GoodCom = wrapWithUserHeight(3)(wrapWithUsername(Good))

ReactDOM.render(
  <div>
    <GoodCom></GoodCom>
  </div>,
  document.querySelector('#root')
)
