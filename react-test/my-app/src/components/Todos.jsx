import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addTodo } from './../redux/actions/todos'

export default function Todos(props) {
  let [value, setValue] = useState('')
  const todos = useSelector((state) => state.todos)

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      dispatch(addTodo(value))
      setValue('')
    }
  }
  const onChange = (e) => {
    setValue(e.target.value)
  }
  console.log(todos);
  return (
    <>
      <input type="text" value={value} onChange={onChange} onKeyDown={ onSubmit}/>
      <ul>
        {
          todos.map((todo, i) => <li key={todo.id}>{i+1} - { todo.name}</li>)
        }
      </ul>
    </>
  )
}