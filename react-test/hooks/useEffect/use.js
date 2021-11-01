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
  //生命周期
  //每次UI更新之后都会执行
  React.useEffect(()=>{
    console.log('UI更新之后')
  })
  React.useEffect(()=>{
    console.log('空数组仅第一次执行')
  },[])
  React.useEffect(()=>{
    console.log("n变了之后会触发")
  }, [n])
  React.useEffect(()=>{
    console.log("n和x都变了之后会触发")
  }, [n,x])
  React.useEffect(()=>{
    return ()=>{
      console.log('会在组件卸载和更新时调用');
    }
  })
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