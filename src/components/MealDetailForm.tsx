import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Slider from "@material-ui/core/Slider"
import EditableMealIngredient from "./EditableMealIngredient"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import CancelIcon from "@material-ui/icons/Cancel"
import { withRouter, RouteComponentProps } from "react-router-dom"
import Immutable from "immutable"
import cloneDeep from "lodash.clonedeep"
import { Redirect } from "react-router"
import CommitChangesButton from "./CommitChangesButton"
import { EMPTY_MEAL_INGREDIENT } from "../domain/sharedValues"
import {
  Meal,
  MealIngredient,
  EditableItem,
  DietType,
} from "../domain/shoppingListTypes"
import {
  editableItemToMealIngredientConverter,
  mealIngredientToEditableItemConverter,
} from "../domain/editableItemConverters"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    display: "block",
  },
  width300: {
    minWidth: 300,
    maxWidth: 700,
  },
  margin: {
    margin: theme.spacing(1),
  },
  errorText: {
    color: "#ff0000",
  },
}))

interface Props extends RouteComponentProps {
  meal: Meal
}

const MealDetailForm = (props: Props) => {
  const classes = useStyles()
  const meal = props.meal
  const initTagString = meal.meal_tags.map((t) => t.tag).join(" ")

  const [redirect, setRedirect] = useState(false)
  const [description, setDescription] = useState(meal.description)
  const [dietType, setDietType] = useState(meal.diet_type)
  const [imageUrl, setImageUrl] = useState(meal.image_url)
  const [serves, setServes] = useState(meal.serves)
  const [recipeBook, setRecipeBook] = useState(meal.recipe_book)
  const [tagString, setTagString] = useState(initTagString)
  const [descriptionErrorText, setDescriptionErrorText] = useState("")
  const [tagErrorText, setTagErrorText] = useState("")
  const [ingredientErrorText, setIngredientErrorText] = useState("")
  const [mealIngredients, setMealIngredients] = useState(
    Immutable.List(meal.meal_ingredients)
  )

  if (redirect) return <Redirect push to="/meals" />

  const handleDescription = (desc: string) => {
    setDescription(desc)
    const errorMessage = desc === "" ? "Description cannot be blank" : ""
    setDescriptionErrorText(errorMessage)
  }

  const handleTagString = (str: string) => {
    const uc = str.toUpperCase()
    setTagString(uc)
    const strList = Immutable.List(uc.split(""))
    const e = strList.filterNot(
      (c) => (c >= "A" && c <= "Z") || (c >= "0" && c <= "9") || c === " "
    )
    const errorMessage =
      e.size > 0 || uc.trim().length === 0
        ? "At least one tag required, no symbols"
        : ""
    setTagErrorText(errorMessage)
  }

  const marks = Array(8)
    .fill({})
    .map((e, i) => ({ value: i + 1, label: (i + 1).toString() }))

  const deleteIngredient = (i: number) => {
    const ings = mealIngredients.delete(i)
    setMealIngredients(ings)
    validateIngredients(ings)
  }

  const editIngredient = (i: number, ei: EditableItem) => {
    const ing = editableItemToMealIngredientConverter(ei)
    const ings = mealIngredients.set(i, ing)
    setMealIngredients(ings)
    validateIngredients(ings)
  }

  const addIngredient = () => {
    const newIngredient: MealIngredient = cloneDeep(EMPTY_MEAL_INGREDIENT)
    const ings = mealIngredients.unshift(newIngredient)
    setMealIngredients(ings)
    validateIngredients(ings)
  }

  const validateIngredients = (ings: Immutable.List<MealIngredient>) => {
    // Ingredient names must be non-blank
    if (ings.findIndex((mi) => !mi.ingredient.description) >= 0)
      setIngredientErrorText("Ingredient name must be specified")
    // No negative/zero quantities
    else if (ings.findIndex((mi) => mi.quantity <= 0) >= 0)
      setIngredientErrorText("Quantities must be positive")
    // At least one ingredient
    else if (ings.size === 0)
      setIngredientErrorText("Please specify at least one ingredient")
    // Can't have the same ingredient twice
    else if (
      ings.size !== ings.map((mi) => mi.ingredient.description).toSet().size
    )
      setIngredientErrorText("Each ingredient must appear at most once")
    else setIngredientErrorText("")
  }

  return (
    <div>
      <Paper className={classes.width300}>
        <FormControl className={classes.formControl}>
          <TextField
            required
            label="Description"
            value={description}
            autoFocus
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => handleDescription(e.target.value)}
            placeholder="Description"
            error={!!descriptionErrorText}
            helperText={descriptionErrorText}
          />
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Diet type</FormLabel>
          <RadioGroup
            row
            name="diet_type"
            value={dietType}
            onChange={(e) => setDietType(e.target.value as DietType)}
          >
            <FormControlLabel value="OMNI" control={<Radio />} label="Omni" />
            <FormControlLabel
              value="VEGETARIAN"
              control={<Radio />}
              label="Vegetarian"
            />
            <FormControlLabel value="VEGAN" control={<Radio />} label="Vegan" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <TextField
            label="Image URL"
            value={imageUrl}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Serves</FormLabel>
          <Slider
            step={1}
            marks={marks}
            min={1}
            max={8}
            value={serves}
            valueLabelDisplay="on"
            onChange={(e, v) => setServes(v as number)}
          />
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <TextField
            label="Recipe book"
            value={recipeBook}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setRecipeBook(e.target.value)}
            placeholder="Recipe book"
          />
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <TextField
            label="Tags"
            value={tagString}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => handleTagString(e.target.value)}
            error={!!tagErrorText}
            helperText={tagErrorText}
            placeholder="Tags"
          />
        </FormControl>
      </Paper>
      <h2 className={classes.margin}>Ingredients</h2>
      <Button
        variant="contained"
        color="secondary"
        className={classes.margin}
        startIcon={<AddIcon />}
        onClick={() => addIngredient()}
      >
        Add ingredient
      </Button>
      {mealIngredients.map((mi, i) => (
        <EditableMealIngredient
          mealIngredient={mealIngredientToEditableItemConverter(mi)}
          key={i}
          deleteIngredient={() => deleteIngredient(i)}
          editItem={editIngredient}
          listMode={false}
        />
      ))}
      <p className={classes.errorText}>{ingredientErrorText}</p>

      <CommitChangesButton
        mealId={meal.meal_id}
        description={description}
        serves={serves}
        dietType={dietType}
        recipeBook={recipeBook}
        imageUrl={imageUrl}
        tagString={tagString}
        mealIngredients={mealIngredients}
        errorsExist={
          !!descriptionErrorText ||
          !!tagErrorText ||
          !!ingredientErrorText ||
          !description ||
          !tagString
        }
      />
      <Button
        variant="contained"
        color="default"
        className={classes.margin}
        startIcon={<CancelIcon />}
        onClick={() => setRedirect(true)}
      >
        Cancel
      </Button>
    </div>
  )
}

export default withRouter(MealDetailForm)
