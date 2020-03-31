import React from 'react'
import Immutable from 'immutable'
import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'
import {UPSERT_INGREDIENTS, UPSERT_MEAL, SET_INGREDIENTS_AND_TAGS} from '../api/mutations'
import omit from "lodash.omit"

const useStyles = makeStyles(theme => ({

  margin: {
    margin: theme.spacing(1)
  }
}))

const CommitChangesButton = (props) => {
  const classes = useStyles()
  
  const [upsertIngredients, 
    { called: calledIngredients, loading: loadingIngredients, error: ingredientsError, data: ingredientsData }] = 
      useMutation(UPSERT_INGREDIENTS)

  const [upsertMeal, 
    { called: calledMeal, loading: loadingMeal, error: mealError, data: mealData }] = 
      useMutation(UPSERT_MEAL)

  const [setMealIngsTags, 
    { called: calledMealIngsTags, loading: loadingMealIngsTags, error: mealIngsTagsError }] = 
      useMutation(SET_INGREDIENTS_AND_TAGS)

  const saveChanges = () => {
    
    // Ingredients firt, the rest follows on once completed
    console.log("Attempting ingredient upsert")
    const ingredients = props.mealIngredients.map(mi => mi.ingredient).map(i => omit(i, "__typename"))
    console.log(JSON.stringify(ingredients))
    upsertIngredients({
      variables: { 
        ingredients: ingredients
      }
    })

  }

  if (calledIngredients && !loadingIngredients && !ingredientsError && !calledMeal) {
    console.log("Attempting meal upsert")
    const meal = {
      meal_id: props.mealId,
      description: props.description,
      serves: props.serves,
      leftovers: props.leftovers,
      diet_type: props.dietType,
      recipe_book: props.recipeBook,
      image_url: props.imageUrl      
    }
    console.log(JSON.stringify(meal))
    upsertMeal({
      variables: { 
        meal: meal
      } 
    }) 
  }

  if (calledMeal && !loadingMeal && !mealError && !calledMealIngsTags) {
    console.log("Attempting mi & tags update")
    const mealId = mealData.mealId
    const tags = props.tagString.split(' ').map(t => ({meal_id: mealId, tag: t}))

    const ingredients = Immutable.Set(ingredientsData)
    const ingredientLookup = (desc) => ingredients.find(i => i.description === desc)
    const mis = Immutable.Set(props.mealIngredients)
    const newMealIngredients = mis.map(mi => ({...mi, meal_id: ingredientLookup(mi.description)}))

    setMealIngsTags({
      variables: { 
        mealId: mealId,
        mealIngredients: newMealIngredients,
        tags: tags
      }
    }) 
  }

  if (calledMealIngsTags && !loadingMealIngsTags && !mealIngsTagsError) {
    props.history.goBack()
  }

  return <Button variant="contained" color="primary" className={classes.margin} 
            startIcon={<SaveIcon />}
            onClick={() => saveChanges()}
            disabled={loadingIngredients || loadingMeal || loadingMealIngsTags}>
           Save
         </Button>

}

export default withRouter(CommitChangesButton)