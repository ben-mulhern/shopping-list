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

const CREATE_NEW_INGREDIENTS = gql`
  mutation create_new_ingredients($ingredients: [ingredient_insert_input!]!) {
    insert_ingredient(objects: $ingredients) {
      returning {
        ingredient_id,
        description
      }
    }    
  }
`
const SET_INGREDIENTS_AND_TAGS = gql`
  mutation set_meal_children($mealId: Int!,
                             $mealIngredients: [meal_ingredient_insert_input!]!,
                             $tags: [meal_tag_insert_input!]!) {
    delete_meal_ingredient(where: {meal_id: {_eq: $mealId}}) {
      affected_rows
    }
    insert_meal_ingredient(objects: $mealIngredients) {
      returning {
        ingredient_id
      }
    }    
    delete_meal_tag(where: {meal_id: {_eq: $mealId}}) {
      affected_rows
    }
    insert_meal_tag(objects: $tags) {
      returning {
        tag
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
  const [createNewIngredientsQuery, { loading: creatingNewIngredients, error: newIngredientError, data: createIngredientData }] = useMutation(CREATE_NEW_INGREDIENTS)
  const [updateMeal, { loading: updatingMeal, error: updateError }] = useMutation(UPDATE_MEAL)
  const [setIngredientsAndTagsQuery, { loading: settingIngredients, error: setIngredientsError }] = useMutation(SET_INGREDIENTS_AND_TAGS)

  const saveChanges = async () => {

    let mealId
    if (!props.mealId) {
      await createNewMealHeader()
    } else {
      mealId = props.mealId
      await updateMealHeader()
    }
    await createNewIngredients()
    await setIngredientsAndTags(mealId)
    // refresh main list here?
    // Also need to update store location field on existing ingredients
    props.history.push('/meals')
  }

  const createNewIngredients = () => {
    const newIngs = props.mealIngredients.filter(mi => (!mi.ingredient.ingredient_id))
    const newRows = newIngs.map(mi => ({
      description: mi.ingredient.description, 
      store_location_id: mi.ingredient.store_location.store_location_id
    }))
    createNewIngredientsQuery({
      variables: { 
        ingredients: newRows
      }
    })
  }
  const setIngredientsAndTags = (mealId) => {  
    const tags = Immutable.Set(props.tagString.split(' '))
    const tagObjs = tags.map(t => ({
      meal_id: mealId,
      tag: t})).toArray()

    // todo - set mealIngredients
    // need to split out the query for new ingredient creation
    const mealIngredients = []  

    setIngredientsAndTagsQuery({
      variables: { 
        mealId: mealId,
        mealIngredients: mealIngredients,
        tags: tagObjs
      }
    })
  }

  const createNewMealHeader = async () => {
    await createMeal({
      variables: { 
        description: props.description,
        serves: props.serves,
        leftovers: props.leftovers,
        dietType: props.dietType,
        recipeBook: props.recipeBook,
        imageUrl: props.imageUrl
      }
    })
    // Need to return the meal id now
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

  return <Button variant="contained" color="primary" className={classes.margin} 
            startIcon={<SaveIcon />}
            onClick={() => saveChanges()}>
           Save
         </Button>

}

export default withRouter(CommitChangesButton)