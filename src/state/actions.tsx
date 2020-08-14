import { Unit, StoreLocation, Ingredient } from "../domain/shoppingListTypes"
import Immutable from "immutable"

export const LOGIN = "LOGIN"
export const logIn = (): AppActionType => ({
  type: LOGIN,
})
interface LOGIN_ACTION {
  type: typeof LOGIN
}

export const LOGOUT = "LOGOUT"
export const logOut = (): AppActionType => ({
  type: LOGOUT,
})
interface LOGOUT_ACTION {
  type: typeof LOGOUT
}

export const SAVE_API_KEY = "SAVE_API_KEY"
export const saveApiKey = (apiKey: string): AppActionType => ({
  type: SAVE_API_KEY,
  apiKey,
})
interface SAVE_API_ACTION {
  type: typeof SAVE_API_KEY
  apiKey: string
}

export const SET_TAB = "SET_TAB"
export const setTab = (tabIndex: number): AppActionType => ({
  type: SET_TAB,
  tabIndex,
})
interface SET_TAB_ACTION {
  type: typeof SET_TAB
  tabIndex: number
}

export const SET_LAST_TICKED_ITEM = "SET_LAST_TICKED_ITEM"
export const setLastTickedItem = (id: number): AppActionType => ({
  type: SET_LAST_TICKED_ITEM,
  id,
})
interface SET_LAST_TICKED_ITEM_ACTION {
  type: typeof SET_LAST_TICKED_ITEM
  id: number
}

export const TOGGLE_PLAN_ONLY_MODE = "TOGGLE_PLAN_ONLY_MODE"
export const togglePlanOnlyMode = (mode: boolean): AppActionType => ({
  type: TOGGLE_PLAN_ONLY_MODE,
  mode,
})
interface TOGGLE_PLAN_ONLY_MODE_ACTION {
  type: typeof TOGGLE_PLAN_ONLY_MODE
  mode: boolean
}

export const STORE_STATIC_DATA = "STORE_STATIC_DATA"
export const storeStaticData = (
  units: Immutable.List<Unit>,
  locations: Immutable.List<StoreLocation>,
  ingredients: Immutable.List<Ingredient>
): AppActionType => ({
  type: STORE_STATIC_DATA,
  units,
  locations,
  ingredients,
})
interface STORE_STATIC_DATA_ACTION {
  type: typeof STORE_STATIC_DATA
  units: Immutable.List<Unit>
  locations: Immutable.List<StoreLocation>
  ingredients: Immutable.List<Ingredient>
}

export type AppActionType =
  | LOGIN_ACTION
  | LOGOUT_ACTION
  | SAVE_API_ACTION
  | SET_TAB_ACTION
  | SET_LAST_TICKED_ITEM_ACTION
  | TOGGLE_PLAN_ONLY_MODE_ACTION
  | STORE_STATIC_DATA_ACTION
