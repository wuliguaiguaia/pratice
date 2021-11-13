// React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect

const HelloFunc = props => {
  //state
  const [n, setN] = React.useState(0)
  const [times, setTimes] = React.useState(0)
  const [x, setX] = React.useState(0)
  //事件
  const handleChangeN = ()=>{
    setN(n + 1)
  }
  const handleChangeX = ()=>{
    setX(x + 1)
  }
  //可代替生命周期
  // 以下log的执行顺序和写的顺序一致，生命周期执行顺序和写的顺序一致
  React.useEffect(() => {
    console.log('任意state发生变化都会触发, 包括初始化,  componentDIdMount + componentDidUpdate')
  })
  React.useEffect(() => {
    console.log("只有当 n 发生变化才会触发，包括初始化，componentDIdMount + componentDidUpdate")
  }, [n])
  React.useEffect(()=>{
      console.log("只有当 n 或 x 发生变化才会触发，包括初始化，componentDIdMount + componentDidUpdate")
  }, [n, x])

  React.useEffect(() => {
    console.log('空数组，仅第一次执行，componentDIdMount')
    const onResize = (e) => {}
    window.addEventListener('resize', onResize)
    return ()=>{
      window.removeEventListener('resize', onResize)
      console.log('会在组件卸载调用, componentWillUnmount');
    }
  }, [])

  React.useEffect(() => {
    let timer = setInterval(() => {
      setTimes((_times) => {
        return _times + 1
      })
    }, 1000);
    return () => {
      clearInterval(timer) // n 变化先取消定时器
      setTimes(0)
    }
  }, [n])
  return <>
    定时器：{times}
    <div style={{marginTop: '100px'}}>函数式组件</div>
    <div>props：{props.message}</div>
    <div>state：{n}   <button onClick={handleChangeN}>改变n</button></div>
    <div>state：{x}   <button onClick={handleChangeX}>改变x</button></div>
  </>
}
HelloFunc.defaultProps = {
  message: '默认属性'
}
HelloFunc.displayName = 'HelloFunc'
ReactDOM.render(
  <HelloFunc />,
  document.querySelector('#root')
)