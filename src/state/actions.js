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

export const clearSelectedMeals = () => ({
  type: "CLEAR_SELECTED_MEALS",
})

export const setLastTickedItem = (id) => ({
  type: "SET_LAST_TICKED_ITEM",
  id,
})
