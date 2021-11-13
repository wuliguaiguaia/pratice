/* useRef 获取DOM和保存变量 */

function Test() {
  /* 保存 DOM */
  const inputEl = React.useRef()
  const onClick = () => {
    console.log(inputEl); // 对象类型，只有一个 current 属性指向指定DOM
    inputEl.current.value = 'hahahhahahhahh'
  }


  /* 保存变量 */
  const textRef = React.useRef()
  const [text, setText] = React.useState()
  React.useEffect(() => {
    textRef.current = text
    console.log(textRef);
    console.log();
  }, [text])
  
  return <div>
    <input ref={inputEl} />
    <button onClick={onClick}>click me！！！</button>
    <br/>
    <input value={text} onChange={ (e) => setText(e.target.value)}/>
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)