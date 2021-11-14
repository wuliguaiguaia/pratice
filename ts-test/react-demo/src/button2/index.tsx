import React, { Component } from 'react'
import './index.css'

interface IProps {
  size?: string,
  onclick: React.MouseEventHandler
}

interface IState {
  data?: string
}

export default class Button2 extends Component<IProps,IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {}
  }

  static defaultProps = {
    size: 'normal'
  }

  handleClick = () => {
    // 对象可能为“未定义”。ts(2532)
    // 加感叹号表示确定不是 undefined 
    this.setState({data: this.props.size! + 1})
  }

  render() {
    return <>
      <button onClick={this.props.onclick}>
        {this.props.children}
      </button>
      <button onClick={this.handleClick}>hhhhhh{this.state.data}</button>
    </>
  }
}

