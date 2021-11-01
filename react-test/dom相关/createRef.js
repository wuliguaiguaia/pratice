class Test extends React.Component{
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  
  getFocus = () => {
    this.ref.current.focus()
  }
  
  render() {
    return (
      <div>
        <input type="text" ref={this.ref} />
        <button onClick={this.getFocus}>获取焦点</button>
      </div>
    )
  }
}


ReactDOM.render(
  <Test/>,
  document.querySelector('#root')
)