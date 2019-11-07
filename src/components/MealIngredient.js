import React from 'react'

const MealIngredient = (props) => {

  const mi = props.mealIngredient

  const tempString = mi.quantity + " " + mi.unit.unit_id + " " + mi.ingredient.description

  return <p>{tempString}</p>

}

export default MealIngredient