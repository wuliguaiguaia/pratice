const o = { a: 1, b: 2 };
function App() {
  const [value, setValue] = React.useState(o);
  const [value1, setValue1] = React.useState();
  React.useEffect(() => {
    setValue1(value);
  }, []);
  const onClick = () => {
    value1.a = value1.a+1
    setValue1(value1)
  };

  React.useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div>
      origin: {JSON.stringify(o)}
      <hr />
      prevCount: {JSON.stringify(value)}
      <hr />
      Count: {JSON.stringify(value1)}
      <hr />
      <button onClick={onClick}>btn</button>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
