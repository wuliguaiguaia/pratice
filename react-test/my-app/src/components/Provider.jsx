import { Component, Children } from "react";

export default class Provider extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  /* 当 state 或者 props 改变的时候，getChildContext 函数就会被调用。为了更新 context 里的数据，
  使用 this.setState 触发当前 state 的更新。这样会产生一个新的 context 并且子组件会接收到变化。 */
  getChildContext() {
    return { store: this.store }
  }
  /* childContextTypes must be defined in order to use getChildContext(). */

  render() {
    return Children.only(this.props.children)
    /* 验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。 */
  }
}