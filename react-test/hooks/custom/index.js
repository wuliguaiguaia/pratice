/* 自定义hooks：自动获取窗口大小 */

function useWinSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const onResize = function () {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  React.useEffect(() => {
    window.addEventListener('resize', onResize)
  }, [])
  return size
}

function Test() {
  // 使用
  const {width, height} = useWinSize()
  return <div>
    {width}
    <br/>
    {height}
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)

