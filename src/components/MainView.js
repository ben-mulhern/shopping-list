import React from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import Login from "./Login"
import MealCards from "./MealCards"
import MealDetail from "./MealDetail"
import ShoppingList from "./ShoppingList"
import Navbar from "./Navbar"
import { makeStyles } from "@material-ui/core/styles"
import { logIn } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

const MainView = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const apiKey = sessionStorage.getItem("API_KEY")
  const stateLoggedIn = useSelector((state) => state.loggedIn)
  const loggedIn = stateLoggedIn || (apiKey && !stateLoggedIn)

  if (!stateLoggedIn && apiKey) {
    dispatch(logIn())
  }

  if (!loggedIn && props.location.pathname !== "/login") {
    return <Redirect to="/login" />
  } else if (loggedIn && props.location.pathname === "/login") {
    return <Redirect to="/list" />
  }

  return (
    <div className={classes.margin}>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/list" component={ShoppingList} />
          <Route exact path="/meals" component={MealCards} />
          <Route exact path="/meal/:id" component={MealDetail} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={ShoppingList} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(MainView)
