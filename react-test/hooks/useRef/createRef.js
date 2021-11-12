/* createRef */

function Test() {
  const inputEl = React.createRef()
  const onClick = () => {
    inputEl.current.value = 'hahahhahahhahh'
  }

  return <div>
    <input ref={inputEl} />
    <button onClick={onClick}>click me！！！</button>
    <br />
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)