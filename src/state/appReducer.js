const initialState = {
  apiKey: '',
  activeTab: 0
}

const appReducer = (state = initialState, action) => {

  switch (action.type) {        

    case 'LOGIN':
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