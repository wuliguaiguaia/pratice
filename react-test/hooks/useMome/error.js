/* 反案例 */
function Sub(props) {
 console.log("Sub render");
  let { number, onClick } = props
  return (
    <button onClick={onClick}>{number}</button>
  )
}

// 即使Sub组件和value没有关系，value变化 Sub也会重新渲染
function Test() {
  let [value, setValue] = React.useState('')
  let [number, setNumber] = React.useState(0)
  const addClick = () => setNumber(number + 1)
  return <>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <Sub number={number} onClick={addClick} />
  </>
}

ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)