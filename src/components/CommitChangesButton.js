import React from 'react'
import Immutable from 'immutable'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(theme => ({

  margin: {
    margin: theme.spacing(1)
  }
}))

const CREATE_MEAL = gql`
  mutation insert_meal($description: String!,
                       $serves: smallint!,
                       $leftovers: Boolean!,
                       $dietType: String,
                       $recipeBook: String,
                       $imageUrl: String) {
    insert_meal(
      objects: [
        {
          description: $description,
          serves: $serves,
          leftovers: $leftovers,
          diet_type: $dietType,
          recipe_book: $recipeBook,
          image_url: $imageUrl
        }
      ]
    ) {
      returning {
        meal_id
      }
    }
  }
`

const ADD_INGREDIENTS = gql`
  mutation insert_ingredient($objects: [ingredient_insert_input!]!) {
    insert_ingredient(objects: $objects) {
      returning {
        ingredient_id
      }
    }
  }
`

const UPDATE_MEAL = gql`
  mutation update_meal($mealId: Int!, $changes: meal_set_input!) {
    update_meal(
      where: {meal_id: {_eq: $mealId}},
      _set: $changes
    ) {
      affected_rows
    }  
  }
`
const CommitChangesButton = (props) => {
  const classes = useStyles()
  const [createMeal, { loading: creatingMeal, error: createError, data: createMealData }] = useMutation(CREATE_MEAL)
  const [updateMeal, { loading: updatingMeal, error: updateError }] = useMutation(UPDATE_MEAL)
  const [addIngredientsQuery, { loading: addingIngredients, error: addIngredientsError, data: addIngredientsData }] = useMutation(ADD_INGREDIENTS)

  const saveChanges = () => {

    createNewIngredients()
    if (!props.mealId) {
      createNewMealHeader()
    } else {
      updateMealHeader()
      deleteMealIngredients()
      deleteMealTags()
    }
    addMealIngredients()
    addMealTags()
    // refresh main list here?
    props.history.push(`/meals`)
  }

  const createNewIngredients = () => {  
    const newIngs = props.mealIngredients.filter(mi => (!mi.ingredient.ingredient_id))
    console.log(JSON.stringify(newIngs))
    const newRows = newIngs.map(mi => ({
      description: mi.ingredient.description, 
      store_location_id: mi.ingredient.store_location.store_location_id
    }))
    console.log(JSON.stringify(newRows))
    addIngredientsQuery({
      variables: { 
        objects: newRows
      }
    })

  }
  const createNewMealHeader = () => {
    createMeal({
      variables: { 
        description: props.description,
        serves: props.serves,
        leftovers: props.leftovers,
        dietType: props.dietType,
        recipeBook: props.recipeBook,
        imageUrl: props.imageUrl
      }
    })
  }
  const updateMealHeader = () => {
    updateMeal({
      variables: { 
        mealId: props.mealId,
        changes: {
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
  const deleteMealIngredients = () => {}
  const deleteMealTags = () => {}
  const addMealIngredients = () => {}
  const addMealTags = () => {
    const tags = Immutable.Set(props.tagString.split(' '))
    const tagObjs = tags.map(t => ({"tag": t})).toArray()
  }


  return <Button variant="contained" color="primary" className={classes.margin} 
            startIcon={<SaveIcon />}
            onClick={() => saveChanges()}>
           Save
         </Button>

}

export default withRouter(CommitChangesButton)