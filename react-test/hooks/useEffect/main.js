// effect（副作用）：指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。
// 副作用操作可以分两类：需要清除的和不需要清除的。
// 原先在函数组件内（这里指在 React 渲染阶段）改变 dom 、发送 ajax 请求以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性
// useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。
// 它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
// useEffect 接收一个函数，该函数会在组件渲染到屏幕之后才执行，该函数有要求：要么返回一个能清除副作用的函数，要么就不返回任何内容
// 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。
// 大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同。

let index
function Test() {
  index = 0 /* 初始化 */
  const [number, setNumber] = React.useState(0)
  const [name, setName] = React.useState('p')
  const onClick = _ => setNumber(number + 1)
  const onClickName = _ => setName(name + 'k')

  useEffect(() => {
    console.log('每次UI更新之后都会执行, 渲染完后之后, componentDidUpdate')
  })
  useEffect(() => {
    console.log("number变了之后才会触发")
  }, [number])
  useEffect(() => {
    console.log("number或name都变了之后才会触发")
  }, [number, name])
  useEffect(() => {
    console.log('空数组，仅第一次执行，componentDIdMount')
    return () => {
      console.log('会在组件卸载调用, componentWillUnmount');
    }
  }, [])

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
let unMountCbs = []
function useEffect(cb, arr) {
  if (!alldeps[index]) { // 1、空，每次都执行
    let unMountCb = cb() // 保存组件销毁回调
    unMountCb && !unMountCbs.includes(unMountCb) && unMountCbs.push(unMountCb)
    alldeps[index] = arr
    index++
    return
  }
  let originArr = alldeps[index]
  console.log(originArr, arr);
  let hasChange = arr.some((item, i) => originArr[i] !== item) // 看是否有变化
  if (hasChange) {
    cb()
    alldeps[index] = arr
  }
  index++
}


// 触发组件销毁
setTimeout(() => {
  console.log('某些情况下，组件需要销毁---');
  unMountCbs.forEach(fn => {
    fn()
  });
}, 5000)

ReactDOM.render(
  <Test>das</Test>,
  document.querySelector('#root')
)

