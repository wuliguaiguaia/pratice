function usePrevious(value) {
  console.log(222);
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Test() {
  const [value, setValue] = React.useState('ss')
  const previous = usePrevious(value);
  return <div>
    previous: {previous}
    <input value={value} onChange={(e) => setValue(e.target.value)} />
  </div>
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('root')
)
