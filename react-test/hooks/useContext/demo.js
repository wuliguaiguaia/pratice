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
  const theme = React.useContext(ThemeContext)
  return  <button>{theme}</button>
}


ReactDOM.render(
  <Test></Test>,
  document.querySelector('#root')
)