export const logIn = () => ({
  type: "LOGIN",
})

export const saveApiKey = (apiKey) => ({
  type: "SAVE_API_KEY",
  apiKey,
})

export const setTab = (tabIndex) => ({
  type: "SET_TAB",
  tabIndex,
})

export const toggleMeal = (mealId) => ({
  type: "TOGGLE_MEAL",
  mealId,
})
