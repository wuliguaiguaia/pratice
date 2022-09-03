function Test() {
    const [value, setValue] = React.useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return <input value={value} onChange={ handleChange} />;
}


ReactDOM.render(
    <Test/>,
    document.querySelector('#root')
);