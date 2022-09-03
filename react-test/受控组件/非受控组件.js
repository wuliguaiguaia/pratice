/*
如果一个表单组件没有value props（单选和复选按钮对应的是checked props）时，就可以称为非受控组件。在
非受控组件中，可以使用一个ref来从DOM获得表单值。而不是为每个状态更新编写一个事件处理程序。

React官方的解释：

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 ref来从 DOM 节点中获取表单数据。

因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

例如，下面的代码在非受控组件中接收单个属性：
*/


// class NameForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleSubmit(event) {
//         alert('A name was submitted: ' + this.input.value);
//         event.preventDefault();
//     }
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//           Name:
//                     <input type="text" ref={(input) => this.input = input} />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }

function NameForm() {
    const input = React.useRef();
    const handleSubmit = (event) => {
        console.log(input.current.value);
        event.preventDefault();
    };
    return <form onSubmit = { handleSubmit }>
        <input type="submit" />
        <input ref={ input} />;
    </form>;
}

ReactDOM.render(
    <NameForm />,
    document.querySelector('#root')
);