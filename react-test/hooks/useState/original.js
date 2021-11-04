function Test() {
  let [count, setCount] = []
  let sex = 0
  if (sex) {
    count = React.useState(0)[0]
    setCount =  React.useState(0)[1]
  }
  const change = () => setCount(count + 1)
  return <div>
    {count}
    <button onClick={change}>click</button>
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)