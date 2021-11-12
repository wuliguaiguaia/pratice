// 缓存方法

const set = new Set(); // 保存callback被声明的次数

function Test() {
  const [count, setCount] = React.useState(1);
  const [val, setVal] = React.useState('');

  const callback = () => count
  set.add(callback);

  const changeCount = () => setCount(count + 1)
  const changeValue = event => setVal(event.target.value)
  return <div>
    <h4>{count}</h4>
    <h4>{set.size}</h4>
    <div>
      <button onClick={changeCount}>+</button>
      <input value={val} onChange={changeValue} />
    </div>
  </div>;
}

ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)