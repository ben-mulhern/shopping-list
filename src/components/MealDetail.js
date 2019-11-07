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
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/core/Slider'
import MealIngredient from './MealIngredient'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    display: 'block'
  },
  width300: {
    minWidth: 300,
    maxWidth: 600
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
  "leftovers": false,
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

  const marks = [
    {value: 1, label: "1"},
    {value: 2, label: "2"},
    {value: 3, label: "3"},
    {value: 4, label: "4"},
    {value: 5, label: "5"},
    {value: 6, label: "6"},
    {value: 7, label: "7"},
    {value: 8, label: "8"}
  ]

  return (
    <div className={classes.width300}>
      
      <FormControl className={classes.formControl}>
        <TextField required label="Description" value={meal.description} autoFocus
          fullWidth margin="normal" variant="outlined"
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

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Leftovers</FormLabel>        
        <Switch
          checked={meal.leftovers}
          value={meal.leftovers}
          color="primary"
        />
      </FormControl>     

      <FormControl component="fieldset" className={classes.formControl}>
        <TextField label="Image URL" value={meal.image_url}
          fullWidth margin="normal" variant="outlined"
          placeholder="Image URL" />
      </FormControl>  

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Serves</FormLabel>   
        <Slider defaultValue={4}
                step={1}
                marks={marks}
                min={1}
                max={8}
                value={meal.serves}
                valueLabelDisplay="on"
        />
      </FormControl>   

      <FormControl component="fieldset" className={classes.formControl}>
        <TextField label="Recipe book" value={meal.recipe_book}
          fullWidth margin="normal" variant="outlined"
          placeholder="Recipe book" />
      </FormControl>  

      <FormControl component="fieldset" className={classes.formControl}>
        <TextField label="Tags" value={meal.meal_tags.map(t => t.tag).join(" ")}
          fullWidth margin="normal" variant="outlined"
          placeholder="Tags" />
      </FormControl>  

      <h2>Ingredients</h2>
      {meal.meal_ingredients.map(mi => <MealIngredient mealIngredient={mi} />)}

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(ShoppingList)