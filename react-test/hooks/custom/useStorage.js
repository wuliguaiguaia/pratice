function useStorage(name, initval) {
  const [value, setValue] = React.useState(localStorage.getItem(name) || initval)
  React.useEffect(() => {
    localStorage.setItem(name, value)
  }, [value])
  return [value, setValue]
}

function Test() {
  let [value, setValue] = useStorage('test', 12)
  // setValue(2333) // Too many re-renders. React limits the number of renders to prevent an infinite loop.
  return <div>
    {value}
    <button onClick={() => {setValue(555)}}>click</button>
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)