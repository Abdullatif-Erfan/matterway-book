import { combineReducers } from 'redux'
import book from './book'
const reducers = combineReducers({ book })
export default reducers
export type AppState = ReturnType<typeof reducers>
