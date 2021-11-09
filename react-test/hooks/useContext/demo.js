const ThemeContext = React.createContext('light')
function Test() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar theme="dark" />
    </ThemeContext.Provider>
  )
}

function Toolbar(props) {
  return (
    // 中间的组件再也不必指明往下传递 theme 了。
    <div>
      <Button />
    </div>
  )
}

function Button() {
  // 指定 contextType 读取当前的 themecontext。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  const theme = React.useContext(ThemeContext)
  return <button>{ theme }</button>
}

function Button() {
  // 指定 contextType 读取当前的 themecontext。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  return <ThemeContext.Consumer>
    {
      theme => <button>{theme}</button>
    }
    </ThemeContext.Consumer>
}


ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)