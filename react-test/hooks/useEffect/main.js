// effect（副作用）：指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。
// 副作用操作可以分两类：需要清除的和不需要清除的。
// 原先在函数组件内（这里指在 React 渲染阶段）改变 dom 、发送 ajax 请求以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性
// useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。
// 它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
// useEffect 接收一个函数，该函数会在组件渲染到屏幕之后才执行，该函数有要求：要么返回一个能清除副作用的函数，要么就不返回任何内容
// 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。
// 大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同。


function Test() {
  effectCursor = 0 /* note */
  const [number, setNumber] = React.useState(0)
  const [name, setName] = React.useState('p')
  const onClick = _ => setNumber(number + 1)
  const onClickName = _ => setName(name + 'k')
  useEffect((val) => {
    console.log(val);
  }, [number])
  useEffect((val) => {
    console.log(val, '===');
      // useEffect 如果返回一个函数的话，该函数会在组件卸载和更新时调用
      // useEffect 在执行副作用函数之前，会先调用上一次返回的函数
      // 如果要清除副作用，要么返回一个清除副作用的函数
  })
  return <div>
    {number}
    <br />
    <button onClick={onClick}>number</button>
    <br />
    {name}
    <br />
    <button onClick={onClickName}>name</button>
  </div>
}

let alldeps = []
let effectCursor = 0;
function useEffect(cb, depArray) {
  if (!depArray) { // 1、空，每次都执行
    cb();
    alldeps[effectCursor] = depArray
    effectCursor++
    return
  }

  let deps = alldeps[effectCursor]
  let hasChangeDeps = deps
    ? depArray.some((item, i) => item != deps[i]) // 2、空数组每次都相等，只执行一次
    : true // 3、第一次执行
  if (hasChangeDeps) {
    cb(depArray)
    alldeps[effectCursor] = depArray
  }
  effectCursor++
}


ReactDOM.render(
  <Test>das</Test>,
  document.querySelector('#root')
)

