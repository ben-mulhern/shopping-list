import {login, logout, startLoginCheck} from '../actions/loginActions'
import getLoginStatus from '../api/getLoginStatus'

const checkLogin = () => {  
  console.log("About to call API")
  return dispatch => {
    console.log("Really about to call API")
    dispatch(startLoginCheck())    
    getLoginStatus()
      .then(res => {
        if (res.ok) {
          console.log("API call was good")
          dispatch(login())
        } else {
          console.log("API call was bad")
          dispatch(logout())
        }    
      })   
  }
}

export default checkLogin