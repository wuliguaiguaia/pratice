/* 模拟 redux */

/* useContext： 状态全局化，并能统一管理 */
/* useReducer： 控制业务逻辑 */


const ColorContext = React.createContext()

const UPDATE_COLOR = 'update_color'
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return { ...state, color: action.color }
    default:
      return state
  }
}

/* 类似于 provider  */
function Color(props) {
  const [state, dispatch] = React.useReducer(reducer, { color: 'blue' })
  return <ColorContext.Provider value={{state, dispatch}}>
    {props.children}
  </ColorContext.Provider>
}

/* 入口 */
function App() {
  return <Color>
    <Text />
    <Buttons />
  </Color>
}

/* 子组件1 */
function Text() {
  // 使用全局数据
  const { state: { color } } = React.useContext(ColorContext)
  return <div style={{ color: color }}>text text text</div>
}

/* 子组件2 */
function Buttons() {
  // 使用全局数据
  const { dispatch } = React.useContext(ColorContext)
  return <div>
    <button onClick={() => { dispatch({ type: UPDATE_COLOR, color: 'green' }) }}> green </button>
    <button onClick={() => { dispatch({ type: UPDATE_COLOR, color: 'red' }) }}> red </button>
  </div>
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)