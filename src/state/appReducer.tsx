import { AppActionType } from "./actions"
import { INITIAL_STATE } from "./RootState"

const appReducer = (state = INITIAL_STATE, action: AppActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
      }

    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
      }

    case "SET_TAB":
      return {
        ...state,
        activeTab: action.tabIndex,
      }

    case "SET_LAST_TICKED_ITEM":
      return {
        ...state,
        lastTickedId: action.id,
      }

    case "TOGGLE_PLAN_ONLY_MODE":
      return {
        ...state,
        planOnlyMode: action.mode,
      }

    case "STORE_STATIC_DATA":
      return {
        ...state,
        units: action.units,
        locations: action.locations,
        ingredients: action.ingredients,
      }

    default:
      return state
  }
}

export default appReducer
