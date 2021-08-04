/* 
  React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。
  通过在函数组件里调用它来给组件添加一些内部 state，React会 在重复渲染时保留这个 state
  useState 唯一的参数就是初始 state
  useState 会返回一个数组：一个 state，一个更新 state 的函数

  类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并，而是直接替换
 */



// 每次渲染都是独立的闭包
// 每一次渲染都有它自己的 Props 和 State
// 每一次渲染都有它自己的事件处理函数
// 当点击更新状态的时候，函数组件都会重新被调用，那么每次渲染都是独立的，取到的值不会受后面操作的影响
function Test() {
  let [number, setNumber] = useState(0)
  let [name, setName] = useState('q')
  
  console.log(number, name);

  const onClick = () => setNumber(number + 1)
  const onClickName = () => setName(name + 'w')

  return (
    <div>
      {number} <button onClick={onClick}>number</button>
      {name} <button onClick={onClickName}>name</button>
    </div>
  )
}

let state = []
let index = 0
function useState(init) {
  const curIndex  = index
  state[curIndex] = state[curIndex] || init
  const setState = (newData) => {
    state[curIndex] = newData
    render()
  }
  let data = state[curIndex]
  index++
  return [data, setState]
}


function render() {
  ReactDOM.render(
    <Test></Test>,
    document.querySelector('#root')
  )
  index = 0
}
render()