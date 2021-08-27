class Test extends React.Component{
  set el(val) {
    console.log(val);
  }
  render() {
    return (
      <div ref={el => this.el = el}>
        fsfsdfsd
      </div>
    )
  }
}
ReactDOM.render(
  <Test/>,
  document.querySelector('#root')
)