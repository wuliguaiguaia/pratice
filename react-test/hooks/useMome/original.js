// useMemo：把创建函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。
// 这种优化有助于避免在每次渲染时都进行高开销的计算，比如多次重复请求


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
  /* 使用 memo  */
  const MemoSub = React.useMemo(
    () => <Sub data={data} onClick={addClick} />,
    [number]
  )
  return <>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    {MemoSub}
  </>
}


ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)