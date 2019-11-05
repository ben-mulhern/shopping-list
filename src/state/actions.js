export const logIn = () => ({
  type: 'LOGIN'
})

export const saveApiKey = (apiKey) => ({
  type: 'SAVE_API_KEY',
  apiKey
})

export const setTab = (tabIndex) => ({
  type: 'SET_TAB',
  tabIndex
})

export const selectMeal = (mealId) => ({
  type: 'SELECT_MEAL',
  mealId
})

export const deselectMeal = (mealId) => ({
  type: 'DESELECT_MEAL',
  mealId
})