function Test() {
  let [number, setNumber] = useState(0)
  let [name, setName] = useState('q')
  
  console.log(number, name);

  const onClick = () => setNumber(number + 1)
  const onClickName = () => setName(name + 'w')

  return (
    <div>
      {number} <button onClick={onClick}>number</button>
      {name} <button onClick={onClickName}>name</button>
    </div>
  )
}

let state = []
let index = 0
function useState(init) {
  const curIndex  = index
  state[curIndex] = state[curIndex] || init
  const setState = (newData) => {
    state[curIndex] = newData
    render()
  }
  let data = state[curIndex]
  index++
  return [data, setState]
}


function render() {
  ReactDOM.render(
    <Test></Test>,
    document.querySelector('#root')
  )
  index = 0
}
render()