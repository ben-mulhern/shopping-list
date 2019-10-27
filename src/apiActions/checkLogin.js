import {login, logout, startLoginCheck} from '../actions/loginActions'
import getLoginStatus from '../api/getLoginStatus'

const checkLogin = () => {  
  return dispatch => {
    dispatch(startLoginCheck())    
    getLoginStatus()
      .then(res => {
        if (res.ok) {
          console.log("Login check successful")
          dispatch(login())
        } else {
          console.log("Login check failed")
          dispatch(logout())
        }    
      })   
  }
}

export default checkLogin