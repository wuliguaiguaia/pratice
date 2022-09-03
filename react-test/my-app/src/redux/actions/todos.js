export const ADD_TODO = 'addTodo'
const sleep = (ms) => new Promise((resolve)=> setTimeout(resolve, ms))

export const addTodo = (text) => {
  return dispatch => {
    sleep(1000).then(() => {
      dispatch({
        type: ADD_TODO,
        payload: {
          name: text,
          id: +new Date()
        }
      })
    })
  }  
  // return {
  //   type: ADD_TODO,
  //   payload: {
  //     name: text,
  //     id: +new Date()
  //   }
  // }
}