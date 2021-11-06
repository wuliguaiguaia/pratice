function Test() {
  const [count, dispatch] = React.useReducer((state, action) => {
    switch (action) {
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      default:
        return state
    }
  }, 0)
  return (
    <div>
      count: {count}
      <button onClick={() => dispatch('add')}>add</button>
      <button onClick={() => dispatch('sub')}>sub</button>
    </div>
  )
}

ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)
