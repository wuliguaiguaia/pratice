/* 反案例，name 变了子组件也重新渲染了 */
function Sub(props) {
 console.log("Sub render");
  let { number, onClick } = props
  return (
    <button onClick={onClick}>{number}</button>
  )
}

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