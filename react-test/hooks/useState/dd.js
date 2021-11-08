function Test() {
  const [count, setCount] = React.useState(0)
  const [text, setText] = React.useState('')
  const change = () => setCount(count + 1)
  React.useEffect(() => {
    fetch("http://127.0.0.1:5504/react-test/index.html").then(async res => {
      let txt = await res.text()
      setText(txt)
    })
  }, [])
  return <div>
    {count}
    <button onClick={change}>click</button>
    {text}
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)