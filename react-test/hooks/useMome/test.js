/* 反案例，name 变了子组件也重新渲染了 */
function Sub(props) {
 console.log("Sub render");
  let { data, onClick } = props
  return (
    <button onClick={onClick}>{data.value}</button>
  )
}


function Test() {
  let [name, setName] = React.useState('')
  let [number, setNumber] = React.useState(0)
  let data = { value: number }
  const addClick = () => setNumber(number + 1)
  return <>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <Sub data={data} onClick={addClick} />
  </>
}

ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)