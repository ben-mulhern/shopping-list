const initialState = {
  loggedIn: false,
  activeTab: 0,
  lastTickedId: 0,
  planOnlyMode: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
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

    default:
      return state
  }
}

export default appReducer
