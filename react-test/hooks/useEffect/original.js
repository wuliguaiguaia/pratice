const HelloFunc = props => {
  //state
  const [n, setN] = React.useState(0)
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
    console.log('每次UI更新之后都会执行, 渲染完后之后, componentDidUpdate')
  })
  React.useEffect(() => {
    console.log("n变了之后才会触发")
  }, [n])
  React.useEffect(()=>{
    console.log("n和x都变了之后才会触发")
  }, [n, x])
  React.useEffect(() => {
    console.log('空数组，仅第一次执行，componentDIdMount')
    return ()=>{
      console.log('会在组件卸载调用, componentWillUnmount');
    }
  }, [])
  return <>
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