// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light')
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

function Toolbar(props) {
  return (
    // 中间的组件再也不必指明往下传递 theme 了。
    <div>
      <Button />
    </div>
  )
}
class Button extends React.Component {
  // 指定 contextType 读取当前的 themecontext。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext
  render() {
    return <button>{this.context}</button>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('#root')
)