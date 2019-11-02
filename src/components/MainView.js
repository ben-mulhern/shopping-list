import React from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Login from './Login'
import MealCards from './MealCards'
import ShoppingList from './ShoppingList'
import IngredientCards from './IngredientCards'
import Navbar from './Navbar'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { logIn } from '../state/actions'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

const MainView = (props) => {

  const classes = useStyles()
  const apiKey = sessionStorage.getItem('API_KEY')
  const loggedIn = (props.loggedIn || (apiKey && !props.loggedIn))

  if (!props.loggedIn && apiKey) {
    props.logIn()
  }

  if (!loggedIn && props.location.pathname !== '/login') {
    return <Redirect to='/login'/>
  } else if (loggedIn && props.location.pathname === '/login') {
    return <Redirect to='/list' />
  }

  return (
    <div className={clsx(classes.margin, "App")}>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/list" component={ShoppingList} />
          <Route exact path="/meals" component={MealCards} />
          <Route exact path="/ingredients" component={IngredientCards} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={ShoppingList} />           
        </Switch>
      </div>   
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn())
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainView))
