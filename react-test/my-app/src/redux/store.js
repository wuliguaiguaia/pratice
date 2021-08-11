import { applyMiddleware, compose, createStore } from 'redux'
// import createStore from './createStore'
import { rootReducer} from './reducer/index'
import ReduxThunk from 'redux-thunk'

let store = createStore(rootReducer, compose(applyMiddleware(...[ReduxThunk])))

store.subscribe((w, e) => {
  console.log(222, w, e); // 没有type参数
})

export {
  store
}