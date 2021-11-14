import { Component } from "react";
import Button2 from "./button2";

export default class App extends Component {
  onClick: React.MouseEventHandler = (e) => {
    /* 必须加断言，否则报错 */
    const target = e.target as HTMLButtonElement
    console.log(getComputedStyle(target).width);
    
  }
  render() {
    return <Button2 onclick={this.onClick}>click</Button2>
  }
}