const initialState = {
  loggedIn: false,
  fetching: false,
  heartbeatChecked: false
}

const loginReducer = (state = initialState, action) => {

  switch (action.type) {        

    case 'LOGIN':
      return {
        ...state,
        fetching: false,
        loggedIn: true,
        heartbeatChecked: true
      }

      case 'START_LOGIN_CHECK':
        return {
          ...state,
          fetching: true,
          heartbeatChecked: true
        }

      case 'LOGOUT':
        return {
          ...state,
          fetching: false,
          loggedIn: false,
          heartbeatChecked: true
        }  

        case 'LOGIN_API_ERROR':
            return {
              ...state,
              fetching: false,
              heartbeatChecked: true,
              error: 'Error communicating with server: ' + action.error
            }        
            
    default:
      return state
  }
}

export default loginReducer