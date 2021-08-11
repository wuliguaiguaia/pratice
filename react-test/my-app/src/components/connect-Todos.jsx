import { useCallback, useState } from "react";
import { useDispatch, connect } from "react-redux"
import { addTodo } from './../redux/actions/todos'


/* 使用 connect 高阶组件获取store */
function Todos({ todos}) {
  let [value, setValue] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      dispatch(addTodo(value))
      setValue('')
    }
  }
  const onChange = useCallback((e) => {
    setValue(e.target.value)
  }, [value])

  return (
    <>
      <input type="text" value={value} onChange={onChange} onKeyDown={onSubmit} />
      <ul>
        {
          todos.map((todo, i) => <li key={todo.id}>{i + 1} - {todo.name}</li>)
        }
      </ul>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}
export default connect(mapStateToProps)(Todos)