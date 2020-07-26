export const logIn = () => ({
  type: "LOGIN",
})

export const logOut = () => ({
  type: "LOGOUT",
})

export const saveApiKey = (apiKey) => ({
  type: "SAVE_API_KEY",
  apiKey,
})

export const setTab = (tabIndex) => ({
  type: "SET_TAB",
  tabIndex,
})

export const setLastTickedItem = (id) => ({
  type: "SET_LAST_TICKED_ITEM",
  id,
})

export const togglePlanOnlyMode = (mode) => ({
  type: "TOGGLE_PLAN_ONLY_MODE",
  mode,
})
