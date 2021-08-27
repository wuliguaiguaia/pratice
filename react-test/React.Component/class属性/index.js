class Test extends React.Component {
  state = {
    number: 1
  }
  render() {
    return <div>
      {this.state.number}
      {this.props.ww}
    </div>
  }
}

Test.defaultProps = {
  ww:'fdsfsdfs'
}
Test.displayName = 'eeeee' // 用于调试

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


console.log(Test.name); // Test

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)