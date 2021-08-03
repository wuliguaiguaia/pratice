function Test() {
  let [number, setNumber] = useState(0)
  let [name, setName] = useState('q')
  
  console.log(number, name);

  const onClick = () => setNumber(number + 1)
  const onClickName = () => setName(name + 'w')

  return (
    <div>
      {number} <button onClick={onclick}>number</button>
      {name} <button onClick={onClickName}>name</button>
    </div>
  )
}

let state = []
let index = 0
function useState(init) {
  state[index] = state[index] || init
  const setState = (newData) => {
    state[index] = newData
    debugger
    render()
  }
  let data = state[index]
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