// 防抖 hook
function throttle(fn, time) {
    let cd = true;
    let timer = null;
    return [
        timer,
        function (...arg) {
            if (!cd) { return; }
            fn(...arg);
            cd = false;
            timer = setTimeout(() => {
                cd = true;
            }, time);
        },
    ];
}

function Test() {
    let [value, setValue] = React.useState('');
    let [throttleValue, setThrottleValue] = React.useState('');
    let [timer, change] = React.useCallback(throttle(setThrottleValue, 3000), []);
    let handleInput = (e) => {
        setValue(e.target.value);
    };
    React.useEffect(() => {
        change(value);
        return () => {
            console.log('value 变化的effect');
        };
    }, [value]);
    React.useEffect(() => {
        return () => {
            clearTimeout(timer);
            console.log('组件销毁 清除定时器');
        };
    }, []);
    return <>
        <div>throttleValue: {throttleValue}</div>
        <div>value:{value}</div>
        <input value={value} onChange={handleInput} />
    </>;
}
ReactDOM.render(
    <Test />,
    document.querySelector('#root')
);