/* createRef */

function Test() {
  /* 保存 DOM */
  const inputEl = React.createRef()
  const onClick = () => {
    console.log(inputEl); // 对象类型，只有一个 current 属性指向指定DOM
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