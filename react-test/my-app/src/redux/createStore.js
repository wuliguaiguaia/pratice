export default function createStore(reducer) {
  let state = undefined
  const dispatch = (action) => {
    state = reducer(state, action)
  }
  const getState  = () => {
    return state
  }
  const subscribe = (cb) => {
    cb()
  }

  return {
    dispatch,
    getState,
    subscribe
  }
}