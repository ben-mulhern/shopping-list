const initialState = {
  loggedIn: false,
  fetching: false

}

const loginReducer = (state = initialState, action) => {

  switch (action.type) {        

    case 'LOGIN':
      return {
        ...state,
        fetching: false,
        loggedIn: true
      }

      case 'START_LOGIN_CHECK':
        console.log("Starting login check")
        return {
          ...state,
          fetching: true
        }

      case 'LOGOUT':
        return {
          ...state,
          fetching: false,
          loggedIn: false
        }  

        case 'LOGIN_API_ERROR':
            return {
              ...state,
              fetching: false,
              error: 'Error communicating with server: ' + action.error
            }        
            
    default:
      return state
  }
}

export default loginReducer