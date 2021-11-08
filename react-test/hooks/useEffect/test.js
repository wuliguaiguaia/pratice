// React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect

const Test = props => {
  const [n, setN] = React.useState(0)
  const [times, setTimes] = React.useState(0)
  const handleChangeN = () => {
    setN(n + 1)
  }
  React.useEffect(() => {
    console.log('aaaa')
  })
  React.useEffect(() => {
    console.log("bbbb")
  }, [n])
  React.useEffect(() => {
    console.log(':::n变化，重启定时器:::');
    let timer = setInterval(() => {
      setTimes((_times) => {
        return _times + 1
      })
    }, 2000);
    return () => {
      console.log(':::n变化，清空定时器, 会在 aaaa 前触发:::');
      clearInterval(timer)
      setTimes(0)n变化
    }
  }, [n])
  return <>
    计次器：{times}
    <div>state：{n}   <button onClick={handleChangeN}>改变n</button></div>
  </>
}
Test.defaultProps = {
  message: '默认属性'
}
Test.displayName = 'HelloFunc'
ReactDOM.render(
  <Test />,
  document.querySelector('#root')
)