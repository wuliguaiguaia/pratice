
let initialState = { count: 0 }

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeCount':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export {
  reducer
}