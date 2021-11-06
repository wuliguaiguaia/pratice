/* 解决父子组件传值 
 class prop
 function 也可以是 prop，为啥还要用context？
 可以访问全局状态，避免一层层的传递
*/


const SomeContext = React.createContext()

function Parent() {
  let d = 0
  const [count, setCount] = React.useState(0)
  return <div>
    <button onClick={() => setCount(count + 1)}>click</button>
    <SomeContext.Provider value={count}>
      <Child />
    </SomeContext.Provider>
  </div>
}

function Child(props) {
  let count = React.useContext(SomeContext)
  return <div>
    {count}
  </div>
}

ReactDOM.render(
  <Parent></Parent>,
  document.querySelector('#root')
)