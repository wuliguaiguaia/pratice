function Test() {
  let [number, setNumber] = useState(0)
  const onClick = () => {
    setNumber(number + 1)
  }
  return <div>
    number: {number}
    <br />
    <button onClick={onClick} >点击</button>
  </div>
}


// 只调用一次情况
let data
function useState(init) {
  data = data || init
  const setState = (newData) => {
    data = newData
    render()
  }
  return [data, setState]
}


function render() {
  ReactDOM.render(
    <Test></Test>,
    document.querySelector('#root')
  )
}

render()
