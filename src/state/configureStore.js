import { createStore } from 'redux'
import appReducer from './appReducer'

const configureStore = (initialState) => 
  createStore(appReducer, initialState)

export default configureStore