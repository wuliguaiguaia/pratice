import { ADD_TODO } from './../actions/todos'


let initialState = []
let reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD_TODO:
      // await sleep(1000) 报错：redux内部是同步执行的
      return [
        ...state,
        action.payload
      ]
    default:
      return state // 初始化
  }
}

export {
  reducer
}