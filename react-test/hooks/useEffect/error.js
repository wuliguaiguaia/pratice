function Test() {
  const [count, setCount] = React.useState(0)
  const [text, setText] = React.useState('')
  const change = () => setCount(count + 1)
  React.useEffect(() => {
    console.log(11111);
  })
  
  return <div>
    {count}
    <button onClick={change}>click</button>
    {text}
  </div>
}


ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)