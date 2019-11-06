import React from 'react'
import { connect } from 'react-redux'
import { setTab } from '../state/actions'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(3)
  }  
}))

const mealQuery = gql`
  query getMealById($meal_id: Int!) {
    meal(where: {meal_id: {_eq: $meal_id}}) {
      meal_id
      description
      diet_type
      leftovers
      image_url
      serves
      recipe_book
      meal_tags {
        tag
      }
      meal_ingredients {
        quantity
        unit {
          unit_id
        }
        ingredient {
          ingredient_id
          description
          store_location {
            store_location_id
            description
          }
        }
      }
    }
  }
`

const emptyMeal = {
  "meal_id": 0,
  "description": "",
  "diet_type": "",
  "leftovers": "",
  "image_url": "",
  "serves": 0,
  "recipe_book": "",
  "meal_tags": [],
  "meal_ingredients": []
}

const ShoppingList = (props) => {

  const classes = useStyles()
  props.setTab(1)
  const mealId = props.match.params.id

  const [runMealQuery, { called, loading, error, data }] = useLazyQuery(mealQuery, { variables: { "meal_id": mealId }})  

  if (!called && mealId !== "new") runMealQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const meal = (called ? data.meal[0] : emptyMeal)

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <TextField required label="Description" value={meal.description}
          className={classes.textField} margin="normal" variant="outlined"
          placeholder="Description" />
      </FormControl>  
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Diet type</FormLabel>  
        <RadioGroup row name="diet_type" value={meal.diet_type}>
          <FormControlLabel value="OMNI" control={<Radio />} label="Omni" />
          <FormControlLabel value="VEGETARIAN" control={<Radio />} label="Vegetarian" />
          <FormControlLabel value="VEGAN" control={<Radio />} label="Vegan" />
        </RadioGroup>
      </FormControl>  
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(ShoppingList)