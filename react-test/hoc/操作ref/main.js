class Test extends React.Component {
  state = {
    f: 0
  }
  render() {
    return <div>fsfsdfs</div>
  }
}

const refHoc = () => {
  return (RefComponent) => {
    return class extends React.Component {
      ref = {}
      componentDidMount() {
        console.log(this.ref.state);
      }
      render() {
        return <RefComponent
            {...this.props}
            ref={(instance: any) => {
              this.ref = instance;
            }}
          ></RefComponent>
      }
    }
  }
}

const RefCom = refHoc()(Test)

ReactDOM.render(
  <RefCom></RefCom>,
  document.querySelector('#root')
)