import React from 'react'
import Immutable from 'immutable'
import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'
import {UPSERT_INGREDIENTS, UPSERT_MEAL, SET_INGREDIENTS_AND_TAGS} from '../api/mutations'

const useStyles = makeStyles(theme => ({

  margin: {
    margin: theme.spacing(1)
  }
}))

const CommitChangesButton = (props) => {
  const classes = useStyles()
  
  const [upsertIngredients, 
    { loading: loadingIngredients, error: ingredientsError, data: ingredientsData }] = 
  useMutation(UPSERT_INGREDIENTS, {
    onCompleted({ ingredientsData }) {
      // Now do the meal header
    }
  })

  const [upsertMeal, 
    { loading: loadingMeal, error: mealError, data: mealData }] = 
  useMutation(UPSERT_MEAL, {
    onCompleted({ mealData }) {
      // Now do the meal tags & ingredients
    }
  })

  const saveChanges = () => {
    
    // Ingredients firt, the rest follows on once completed
    const ingredients = props.mealIngredients.map(mi => mi.ingredient)
    upsertIngredients({
      variables: { 
        ingredients: ingredients
      }
    })

  }

  // Takes the ingredient info and passes it through
  const saveMeal = (ingredients) => {
    upsertMeal({
      variables: { 
        meal: {
          meal_id: props.mealId,
          description: props.description,
          serves: props.serves,
          leftovers: props.leftovers,
          diet_type: props.dietType,
          recipe_book: props.recipeBook,
          image_url: props.imageUrl
        }
      }
    })  
  }

  return <Button variant="contained" color="primary" className={classes.margin} 
            startIcon={<SaveIcon />}
            onClick={() => saveChanges()}>
           Save
         </Button>

}

export default withRouter(CommitChangesButton)