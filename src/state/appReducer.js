const initialState = {
  loggedIn: false,
  activeTab: 0,
  lastTickedId: 0,
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

    default:
      return state
  }
}

export default appReducer
