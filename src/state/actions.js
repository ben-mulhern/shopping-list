export const login = (apiKey) => ({
  type: 'LOGIN',
  apiKey
})

export const setTab = (tabIndex) => ({
  type: 'SET_TAB',
  tabIndex
})