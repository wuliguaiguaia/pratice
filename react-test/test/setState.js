class App extends React.Component {
    render() {
        let obj = {
            a: 1,
            b: 2,
            c: 3,
        };
        return (
            <ul>
                {
                    Object.entries(obj).map(([key, value], index) => { // item是一个数组，把item解构，写法是[key, value]
                        return <li key={key}>{value}</li>;
                    })
                }
            </ul>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);