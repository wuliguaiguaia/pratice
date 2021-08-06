import { combineReducers } from 'redux'
import { reducer as todoReducer} from './todos'
export const rootReducer = combineReducers({
  todos: todoReducer
})