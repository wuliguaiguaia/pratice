import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Test() {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  useEffect(() => {
    dispatch({ type: 'changeCount', payload: {count}})
  }, [count, dispatch])
  
  return <div>
    count: {count}
    <button onClick={() => { setCount(count+1)}}>click</button>
  </div>
}