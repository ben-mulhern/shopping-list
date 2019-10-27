import React from 'react'
import {Route} from 'react-router-dom'
import Login from './Login'
import MealCards from './MealCards'
import ShoppingList from './ShoppingList'
import IngredientCards from './IngredientCards'
import Navbar from './Navbar'


const MainView = (props) => {

  return (
    <div className="App">
      <Navbar />
      <div>
        <Route exact path="/" component={ShoppingList} /> 
        <Route exact path="/list" component={ShoppingList} />
        <Route exact path="/meals" component={MealCards} />
        <Route exact path="/ingredients" component={IngredientCards} />
        <Route exact path="/login" component={Login} />
      </div>   
    </div>
  )
}

export default MainView
