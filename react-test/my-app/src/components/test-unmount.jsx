import { BrowserRouter as Router, Link, Route} from "react-router-dom"
import { useEffect, useState } from "react"

function Index() {
  useEffect(() => {
    console.log('componentDidMount :: index come'); // 组件加载触发
    return () => {
      console.log('componentWillUnmount :: index leave'); // 组件销毁触发
    }
  }, []) // 不加[]每次count发生变化都会触发 index come
  return <div>Index Page</div>
}
function List() {
  return <div>List Page</div>
}

export default function Test() {
  let [count, setCount] = useState(0)
  useEffect(() => {
    
  }, [])
  const change = () => setCount(count + 1)
  return <div>
    {count}
    <button onClick={change}>click</button>
    <Router>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/list/">列表</Link></li>
      </ul>
      <Route path="/" component={Index} exact />
      <Route path="/list/" component={List}/ >
    </Router>
  </div>
}
