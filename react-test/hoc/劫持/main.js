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
      
      render() {
        return <p>00000</p>
      }
    }
  }
}

const RefCom = refHoc()(Test)

ReactDOM.render(
  <RefCom></RefCom>,
  document.querySelector('#root')
)