function Test() {
  if (Math.random() > 0.5) {
    const [s, ss] = React.useState(10000)
    // return <h1>{s}</h1>
  }
  const [value, setValue] = React.useState(0)

  return (
    <div>
      <button onClick={() => setValue(value + 1)}>+</button>
      {value}
    </div>
  )
}


ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)

// https://zhuanlan.zhihu.com/p/357232384