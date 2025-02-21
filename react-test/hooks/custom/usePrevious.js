function usePrevious(value) { // 传入初始值
  console.log('执行函数');
  const ref = React.useRef(value);
  const [x, setX] =  React.useState(value);
  React.useEffect(() => { 
    // 当value发生变化更新ref值
    // 由于useEffect是在render之后执行的，因此ref变化并不会引起组件的重新渲染
    console.log('更新值');
    ref.current = value;
  },[value]);
  React.useEffect(() => { 
    setX(value)
  },[value]);
  return [ref.current, x];
}

function useRefState(initialValue) {
  const [state, setState] = React.useState(initialValue);
  const stateRef = React.useRef(state);

  React.useEffect(() => {
      stateRef.current = state;
  }, [state]);

  const innerSetState = React.useCallback((v) => {
      if (typeof v !== 'function') {
          stateRef.current = v;
      }
      setState(v);
  }, []);

  return [state, stateRef.current, innerSetState];
}

function Test() {
  const [value, setValue] = React.useState(1)
  const [previous, x] = usePrevious(value);
  // const [value, previous, setValue] = useRefState(1);
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
    cur:{x}
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)
