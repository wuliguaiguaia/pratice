function App () {
    const ref = React.useRef()
    return <div> <Test ref={ref}/></div>
}
function Test(props) {
    console.log(props); // {} 常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
    return <div>test</div>
}


ReactDOM.render(
    <Test />,
    document.querySelector('#root')
);