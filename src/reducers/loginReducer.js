import Immutable from 'immutable'
import cloneDeep from "lodash.clonedeep"

const initialState = {
  loggedIn: false
}

const loginReducer = (state = initialState, action) => {

  switch (action.type) {        

    case 'LOGIN':
      return {
        ...state,
        loggedIn: true
      }
      case 'LOGOUT':
        return {
          ...state,
          loggedIn: false
        }  
            
    default:
      return state
  }
}

export default loginReducer