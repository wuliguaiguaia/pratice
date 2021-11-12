const ThemeContext = React.createContext('light')
class Test extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar theme="dark" />
      </ThemeContext.Provider>
    )
  }
}

function Toolbar(props) {
  return (
    // 中间的组件再也不必指明往下传递 theme
    <div>
      <Button />
    </div>
  )
}
class Button extends React.Component {
  // React 会往上找到最近的 theme Provider，然后使用它的值
  static contextType = ThemeContext
  render() {
    return <button>{this.context}</button>
  }
}


ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)