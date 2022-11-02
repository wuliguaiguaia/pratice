class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.change = this.change.bind(this);
    }
    componentDidMount() {
        console.log('mount');
    }
    change() {
        this.setState({ count: this.state.count + 1 });
    }
    render() {
        return <div> {this.state.count}
            <button onClick={this.change}>click</button>
        </div>;
    }
}

ReactDOM.render(
    <Test />,
    document.querySelector('#root')
);