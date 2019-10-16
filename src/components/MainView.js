import React from 'react'
import { connect } from 'react-redux'
import {Route, HashRouter} from 'react-router-dom'
import Placeholder from './Placeholder.js'
import checkLogin from '../apiActions/checkLogin'
import Login from './Login'


const MainView = (props) => {

  const {loggedIn, fetching, heartbeatChecked} = props.loginReducer

  if (!heartbeatChecked) {
    props.checkLogin()
  }
  // TODO - show loading icon

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
)((MainView))
