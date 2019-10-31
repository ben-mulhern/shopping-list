const initialState = {
  apiKey: ''
}

const loginReducer = (state = initialState, action) => {

  switch (action.type) {        

    case 'LOGIN':
      return {
        ...state,
        apiKey: action.password
      }
            
    default:
      return state
  }
}

export default loginReducer