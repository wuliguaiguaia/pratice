function Test() {
  const [number, setNumber] = React.useState(0)
  const onClick = _ => setNumber(number + 1)
  useEffect(() => {
    console.log(22);
  }, [number])
  return <div>
    {number}
    <br />
    <button onClick={onClick}>number</button>
  </div>
}

let state
function useEffect(cb, arr) {
  if (!state) {
    state = arr
    cb()
    return
  }

  let hasChange = state ? state.length ? arr.some((item, i) => item !== state[i]) : false : true;
  if (hasChange) {
    cb()
    render()
  }
}


function render() {
  ReactDOM.render(
    <Test>das</Test>,
    document.querySelector('#root')
  )
}

render()
