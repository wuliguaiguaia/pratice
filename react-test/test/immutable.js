function Test() {
    const [todos, setTodos] = React.useState([
        {id: 1, name: 'haha'},
        {id: 2, name: 'ejejje'},
    ]);
    const handleClick = () => {
        const newData = { id: 3, name: 'qerreree' };
        // todos.push(newData);
        const data = [...todos];
        data.push(newData);
        setTodos(data);
    };
    React.useEffect(() => {
        console.log('todos 发生变化', todos);
    }, [todos]);
    return <div>
        {todos.map((item) => {
            return <div key={item.id}>id: {item.id}: { item.name}</div>;
        })}
        <button onClick={handleClick}>click</button>
    </div>;
}
ReactDOM.render(
    <Test />,
    document.querySelector('#root')
);