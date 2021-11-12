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

  const callback =() => count * 2
  set.add(callback);

  const changeValue = event => setVal(event.target.value) 
  const changeCount = () => setCount(count + 1)
  return <div>
    <h4>count: {count}</h4>
    <h4>set.size: {set.size}</h4>
    <div>
      <button onClick={changeCount}>+</button>
      <input value={val} onChange={changeValue} />
    </div>
    <hr />
    <Child callback={callback} />
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
