import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './Login'
import MealCards from './MealCards'
import ShoppingList from './ShoppingList'
import IngredientCards from './IngredientCards'
import Navbar from './Navbar'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  }
}))

const MainView = (props) => {

  const classes = useStyles()

  return (
    <div className={clsx(classes.margin, "App")}>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={ShoppingList} /> 
          <Route exact path="/list" component={ShoppingList} />
          <Route exact path="/meals" component={MealCards} />
          <Route exact path="/ingredients" component={IngredientCards} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>   
    </div>
  )
}

export default MainView
