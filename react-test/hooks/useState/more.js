function Test() {
  const [count, setCount] = React.useState(0)
  const change = React.useCallback(() => setCount(count + 1), [])
  return <div>
    {count}
    <button onClick={change}>click</button>
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)