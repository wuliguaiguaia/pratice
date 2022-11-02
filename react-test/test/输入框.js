function Test() {
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [time, setTime] = React.useState(6);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleClick = () => {
        setLoading(true);
    };

    React.useEffect(() => {
        if (!loading) { return; }
        setTimeout(() => {
            if (time - 1 === 0) {
                setLoading(false);
                setTime(6);
                return;
            }
            setTime(time - 1);
        }, 1000);
    }, [loading, time]);
    return <>
        <input value={value} onChange={handleChange} />
        <button onClick={handleClick}>
            {
                loading ? `${time} 秒后可以再次发送` : '获取验证码'
            }
        </button>
    </>;
}


ReactDOM.render(
    <Test />,
    document.querySelector('#root')
);