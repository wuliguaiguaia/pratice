import { createStore } from 'redux'
// import createStore from './createStore'
import { rootReducer} from './reducer/index'

let store = createStore(rootReducer)
store.subscribe((w, e) => {
  console.log(222, w, e); // 没有type参数
})

export {
  store
}