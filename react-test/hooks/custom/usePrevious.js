function usePrevious(value) { // 传入初始值
  console.log('执行函数');
  const ref = React.useRef(value);
  React.useEffect(() => { 
    // 当value发生变化更新ref值
    // 由于useEffect是在render之后执行的，因此ref变化并不会引起组件的重新渲染
    console.log('更新值');
    ref.current = value;
  },[value]);
  return ref.current;
}

function Test() {
  const [value, setValue] = React.useState(1)
  const previous = usePrevious(value);
  console.log('rerender');
  const handleClick = () => {
    setValue(value+1)
  }

  React.useEffect(() => {
    console.log('useeffect 执行时机是在 render之后');
  },[value])
  return <div>
    previous: {previous}
    <br/>
    current: {value}
    <br></br>
    <button onClick={handleClick}>button</button>
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)
