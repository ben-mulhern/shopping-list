const initialState = {
  apiKey: '',
  loggedIn: false,
  activeTab: 0
}

const appReducer = (state = initialState, action) => {

  switch (action.type) {        

    case 'LOGIN':
      return {
        ...state,
        loggedIn: true
      }

      case 'SAVE_API_KEY':
        return {
          ...state,
          apiKey: action.apiKey
        }

    case 'SET_TAB':
      return {
        ...state,
        activeTab: action.tabIndex
      }      
            
    default:
      return state
  }
}

export default appReducer