/* 反案例 */
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
  const memoSub = React.useMemo(
    () => <Sub number={number} onClick={addClick} />,
    [number]
  )
  return <>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    {memoSub}
  </>
}

ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)