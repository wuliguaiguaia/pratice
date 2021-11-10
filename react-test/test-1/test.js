var h1 = <h1>hello world<span>span</span></h1>
console.log(h1)

var h2 = React.createElement('h1', {
  className: 'h2'
}, 'hello world', React.createElement('span', null, 'span'))

console.log(h2);
// ReactDOM.render(
//   <Test></Test>,
//   document.getElementById('root')
// )
// React.createElement()