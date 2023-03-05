import { createStore } from "redux"
import appReducer from "./appReducer"
import { RootState } from "./RootState"

const configureStore = (initialState?: RootState) =>
  createStore(appReducer, initialState)

export default configureStore
