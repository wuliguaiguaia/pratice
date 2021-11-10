import { combineReducers } from 'redux'
import { reducer as todoReducer} from './todos'
import { reducer as countReducer} from './count'
export const rootReducer = combineReducers({
  todos: todoReducer,
  count: countReducer,
})