import React from 'react';
import './App.css';
import Button from './button';


/* 以下两者等效 */
// const onclick = (e: React.MouseEvent) => {
//   console.log(e,'--');
// }
const onclick: React.MouseEventHandler = e => {
  console.log(e,'--');
}

function App() {
  return (
    <div className="App">
      <Button size="small"></Button>
      <Button size="small" onclick={onclick}>有内容的button</Button>
      <Button size="small" onclick={onclick}><span>内容是元素</span></Button>
      <Button size="small" onclick={onclick}>jahahah<span>内容是元素</span></Button>
    </div>
  );
}

export default App;
