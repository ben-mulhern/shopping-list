import React from 'react'
import Immutable from 'immutable'
import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'
import {UPSERT_INGREDIENTS, UPSERT_MEAL, SET_INGREDIENTS_AND_TAGS} from '../api/mutations'
import omitDeep from "omit-deep-lodash"
import set from "lodash.set"

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
    const ingredients = props.mealIngredients
                          .map(mi => mi.ingredient)
                          .map(i => omitDeep(i, "__typename"))
                          .map(i => set(i, "store_location_id", i.store_location.store_location_id))
                          .map(i => omitDeep(i, "store_location"))
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
    // This is the returned list of ids and descriptions from the API
    const ingResponse = Immutable.Set(ingredientsData.insert_ingredient.returning)
    // Now we have to merge that returned info with the quantity and unit info from the UI. 
    // We try to match on either the id (exisitng ings) or the description (new ings)
    console.log(JSON.stringify(ingResponse))
    const getIngredientId = (desc) => ingResponse.find(i => i.description === desc).ingredient_id
    const mis = Immutable.Set(props.mealIngredients)
    const newMealIngredients = mis.map(mi => (mi.ingredient_id ? mi : {...mi, ingredient_id: getIngredientId(mi.description)}))

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