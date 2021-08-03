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

@wrapWithUsername
class Good extends React.Component {
  render() {
    return <div>good,{this.props.name}</div>
  }
}

@wrapWithUsername
class Bad extends React.Component {
  render() {
    return <div>Bad,{this.props.name}</div>
  }
}


ReactDOM.render(
  <div>
    <Bad></Bad>
    <Good></Good>
  </div>,
  document.querySelector('#root')
)
