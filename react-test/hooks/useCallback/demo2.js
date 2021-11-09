// 缓存方法

const set = new Set();

function Child({ callback }) {
  console.log('child');
  const [count, setCount] = React.useState(() => callback());
  React.useEffect(() => {
    console.log('child effect');
    setCount(callback());
  }, [callback]);
  return <div>
    child count: {count}
  </div>
}

function Test() {
  const [count, setCount] = React.useState(1);
  const [val, setVal] = React.useState('');

  const callback = React.useCallback(() => count * 2, [count]); // 使用了 callback 不会重新声明函数

  set.add(callback);
  const MemoChild = React.useMemo(
    () => <Child callback={callback} />,
    []
  )
 
  const changeCount = () => setCount(count + 1)
  const changeValue = event => setVal(event.target.value)
  return <div>
    <h4>count: {count}</h4>
    <h4>set.size: {set.size}</h4>
    <div>
      <button onClick={changeCount}>+</button>
      <input value={val} onChange={changeValue} />
    </div>
    <hr />
    {MemoChild}
  </div>
}

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)



 // const MemoChild = React.useMemo(
  //   () => <Child callback={callback} />,
  //   [callback]
  // )
