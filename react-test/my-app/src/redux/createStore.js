// 闭包
export default function createStore(reducer) {
  let state = undefined
  const dispatch = (action) => {
    state = reducer(state, action) // 修改 state
  }
  const getState  = () => {
    return state
  }
  const subscribe = (cb) => {
    cb()
  }

  dispatch({type: '@@init'}) // 必须初始化附初始值

  return {
    dispatch,
    getState,
    subscribe
  }
}