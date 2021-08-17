import { Component } from "react"

export default (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    return class extends Component {
      constructor(props, context) {
        super(props, context)
        this.store = context.store
      }

      componentDidMount() {
        this.store.subscribe(this.hasChanged)
      }

      hasChanged() {
        this.forceUpdate()
      }

      render() {
        return <WrappedComponent
          {...this.props}
          {...mapStateToProps(this.store.getState(), this.props)}
          {...mapDispatchToProps(this.store.dispatch, this.props)}
        ></WrappedComponent>
      }
  }
}
