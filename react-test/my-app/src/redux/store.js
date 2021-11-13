import { applyMiddleware, compose, createStore } from 'redux'
// import createStore from './createStore'
import { rootReducer} from './reducer/index'
import ReduxThunk from 'redux-thunk'

let store = createStore(rootReducer, compose(applyMiddleware(...[ReduxThunk])))
/* 在没有使用redux-thunk之前，store.dispatch() , 只能接受一个对象，在使用了redux-thunk之后，就可以接受一个函数了。*/
store.subscribe((w, e) => {
  // console.log(222, w, e); // 没有type参数
})

export {
  store
}