function Test() {
  if (Math.random() > 0.5) {
    let [number, setNumber] = useState(0)
    const onClickNumber = () => setNumber(number + 1)
    return <div>
      {number} <button onClick={onClickNumber}>number</button>
    </div>
  }

  let [name, setName] = useState('q')
  const onClickName = () => setName(name + 'w')
  return (
    <div>
      {name} <button onClick={onClickName}>name</button>
    </div>
  )
}

const state = []
let index = 0
function useState(init) {
  let curIndex = index
  state[curIndex] = state[curIndex] || init
  function setState(newDate) {
    state[curIndex] = newDate
    update()
  }
  index++
  return [state[curIndex], setState]
}

function render() {
  ReactDOM.render(
    <Test></Test>,
    document.querySelector('#root')
  )
  index = 0
}
render()


function update() {
  render()
}