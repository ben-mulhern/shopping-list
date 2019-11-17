import React, { useState } from 'react'
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
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import {withRouter} from 'react-router-dom'
import Immutable from 'immutable'
import cloneDeep from "lodash.clonedeep"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    display: 'block'
  },
  width300: {
    minWidth: 300,
    maxWidth: 600
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

const emptyMealIngredient = {
  quantity: 1,
  unit: {
    unit_id: 'x',
    description: 'units'
  },
  ingredient: {
    description: '',
    store_location: {
      store_location_id: 'CITRUS',
      description: 'Citrus fruits'
    }
  }
}

const MealDetailForm = (props) => {

  const classes = useStyles()
  const meal = props.meal
  const initTagString = meal.meal_tags.map(t => t.tag).join(" ")

  const [description, setDescription] = useState(meal.description)
  const [dietType, setDietType] = useState(meal.diet_type)
  const [leftovers, setLeftovers] = useState(meal.leftovers)
  const [imageUrl, setImageUrl] = useState(meal.image_url)
  const [serves, setServes] = useState(meal.serves)
  const [recipeBook, setRecipeBook] = useState(meal.recipe_book)
  const [tagString, setTagString] = useState(initTagString)
  const [descriptionErrorText, setDescriptionErrorText] = useState('')
  const [mealIngredients, setMealIngredients] = useState(Immutable.List(meal.meal_ingredients))

  const handleDescription = desc => {
    setDescription(desc)
    const errorMessage = ((desc === '') ? 'Description cannot be blank' : '')
    setDescriptionErrorText(errorMessage)
  }

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

  const deleteIngredient = i => {
    const ing = mealIngredients.delete(i)
    setMealIngredients(ing)
  }

  const editIngredient = (i, ing) => {
    const ings = mealIngredients.set(i, ing)
    setMealIngredients(ings)
  }

  const addIngredient = () => {
    const newIngredient = cloneDeep(emptyMealIngredient)
    const ings = mealIngredients.push(newIngredient)
    setMealIngredients(ings)
  }

  return (
    <Paper className={classes.width300}>
      
      <FormControl className={classes.formControl}>
        <TextField required label="Description" value={description} autoFocus
          fullWidth margin="normal" variant="outlined"
          onChange={e => handleDescription(e.target.value)}
          placeholder="Description"
          error={descriptionErrorText}
          helperText={descriptionErrorText} />
      </FormControl>  

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Diet type</FormLabel>  
        <RadioGroup row name="diet_type" value={dietType}
                    onChange={e => setDietType(e.target.value)}>
          <FormControlLabel value="OMNI" control={<Radio />} label="Omni" />
          <FormControlLabel value="VEGETARIAN" control={<Radio />} label="Vegetarian" />
          <FormControlLabel value="VEGAN" control={<Radio />} label="Vegan" />
        </RadioGroup>
      </FormControl>  

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Leftovers</FormLabel>        
        <Switch
          value={leftovers}
          color="primary"
          onChange={e => setLeftovers(e.target.value)}
        />
      </FormControl>     

      <FormControl component="fieldset" className={classes.formControl}>
        <TextField label="Image URL" value={imageUrl}
          fullWidth margin="normal" variant="outlined"
          onChange={e => setImageUrl(e.target.value)}
          placeholder="Image URL" />
      </FormControl>  

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Serves</FormLabel>   
        <Slider step={1}
                marks={marks}
                min={1}
                max={8}
                value={serves}
                valueLabelDisplay="on"
                onChange={(e, v) => setServes(v)}
        />
      </FormControl>   

      <FormControl component="fieldset" className={classes.formControl}>
        <TextField label="Recipe book" value={recipeBook}
          fullWidth margin="normal" variant="outlined"
          onChange={e => setRecipeBook(e.target.value)}
          placeholder="Recipe book" />
      </FormControl>  

      <FormControl component="fieldset" className={classes.formControl}>
        <TextField label="Tags" value={tagString}
          fullWidth margin="normal" variant="outlined"
          onChange={e => setTagString(e.target.value.toUpperCase())}
          placeholder="Tags" />
      </FormControl>  

      <h2 className={classes.margin}>Ingredients</h2>    
      {mealIngredients.map((mi, i) => <MealIngredient mealIngredient={mi} 
                                          units={props.units} locations = {props.locations}
                                          ingredients={props.ingredients} 
                                          key={i} rowIndex={i} 
                                          deleteIngredient={() => deleteIngredient(i)}
                                          editIngredient={editIngredient} />)}

      <Button variant="contained" color="primary" className={classes.margin} startIcon={<SaveIcon />}>
        Save
      </Button>  
      <Button variant="contained" color="secondary" className={classes.margin} 
              startIcon={<AddIcon />}
              onClick={() => addIngredient()}>
        Add ingredient
      </Button>  
      <Button variant="contained" color="default" className={classes.margin} 
              startIcon={<CancelIcon />}
              onClick={() => props.history.goBack()}>
        Cancel
      </Button>  
    </Paper>
  )
}

export default withRouter(MealDetailForm)