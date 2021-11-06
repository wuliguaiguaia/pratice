/* 自定义hooks：自动获取窗口大小 */


/* class 组件得用高阶组件 */

function useMouse() {
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0
  })

  const update = function (e) {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
  }

  React.useEffect(() => {
    document.addEventListener('mousemove', update)
    return (() => {
      document.removeEventListener('mousemove', update)
    })
  }, [])
  return position
}

function Test() {
  // 使用
  const {x, y} = useMouse()
  return <div>
    {x} - {y}
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)

