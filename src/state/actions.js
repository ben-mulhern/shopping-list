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

export const selectMeal = (mealKey) => ({
  type: 'SELECT_MEAL',
  mealKey
})

export const deselectMeal = (mealKey) => ({
  type: 'DESELECT_MEAL',
  mealKey
})