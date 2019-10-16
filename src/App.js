import React from 'react'
import { connect } from 'react-redux'
import {Route, HashRouter} from 'react-router-dom'
import Placeholder from './components/Placeholder.js'
import checkLogin from './apiActions/checkLogin'
import Login from './components/Login'


const App = (props) => {

  const {loggedIn, fetching} = props.loginReducer

  console.log("About to check login status")
  checkLogin()

  // Check login status and show loading icon until we know
  // render login if not or show relevant page

  if (fetching) return <p>Loading...</p>
  if (!loggedIn) return <Login />

  return (
      <HashRouter>
      <div className="App">

        <div>
          <Route exact path="/" component={Placeholder} /> 
        </div>   

      </div>
      </HashRouter>

  )
}

const mapDispatchToProps = dispatch => ({
  checkLogin: () => dispatch(checkLogin())
})

const mapStateToProps = state => {
  return {
    loginReducer: state.loginReducer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((App))
