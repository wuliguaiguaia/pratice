export const addTodo = (text) => {
  return {
    type: 'addTodo',
    payload: {
      name: text,
      id: +new Date()
    }
  }
}