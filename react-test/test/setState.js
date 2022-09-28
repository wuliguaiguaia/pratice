function App() {
    const [value, setValue] = React.useState('ss');
    const value2 = usePrevious(value);
    console.log(value, value2);
    return <div>
        prevCount: {value2}
        <hr />
        <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>;
}

function usePrevious(value) {
    const ref = React.useRef(value);
    React.useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);