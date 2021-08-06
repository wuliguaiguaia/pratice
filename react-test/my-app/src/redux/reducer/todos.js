let initialState = []
let reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'addTodo':
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}

export {
  reducer
}