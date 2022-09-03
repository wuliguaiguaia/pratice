
// 使用useState时候，使用push，pop，splice等直接更改数组对象的坑

// 使用push直接更改数组无法获取到新值，应该采用析构方式，但是在class里面不会有这个问题。代码示例：

function Indicatorfilter() {
    let [num, setNums] = React.useState([0, 1, 2, 3]);
    const test = () => {
    // 这里坑是直接采用push去更新num
    // setNums(num)是无法更新num的
    // 必须使用num = [...num ,1]
        num.push(1);
        // num = [...num ,1]
        setNums(num);
    };
    return (
        <div className='filter'>
            <button onClick={test}>测试</button>
            <div>
                {num.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
}
ReactDOM.render(
    <Indicatorfilter></Indicatorfilter>,
    document.querySelector('#root')
);