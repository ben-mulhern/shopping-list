import React, { useState } from "react"
import Immutable from "immutable"
import { useMutation } from "@apollo/react-hooks"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import { makeStyles } from "@material-ui/core/styles"
import {
  UPSERT_INGREDIENTS,
  UPSERT_MEAL,
  SET_INGREDIENTS,
} from "../api/mealListApiOperations"
import { Redirect } from "react-router"
import {
  DietType,
  MealIngredient,
  Ingredient,
} from "../domain/shoppingListTypes"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

interface Props {
  mealIngredients: Immutable.List<MealIngredient>
  mealId: number
  description: string
  serves: number
  dietType: DietType
  recipeBook?: string
  imageUrl?: string
  errorsExist: boolean
}

interface IngredientInsert {
  ingredient_id?: number
  description: string
  store_location_id: string
}

const prepareIngredientForInsert = (i: Ingredient): IngredientInsert => ({
  ingredient_id: i.ingredient_id,
  description: i.description,
  store_location_id: i.store_location.store_location_id,
})

const CommitChangesButton = (props: Props) => {
  const classes = useStyles()

  const [
    upsertIngredients,
    {
      called: calledIngredients,
      loading: loadingIngredients,
      error: ingredientsError,
      data: ingredientsData,
    },
  ] = useMutation(UPSERT_INGREDIENTS)

  const [
    upsertMeal,
    {
      called: calledMeal,
      loading: loadingMeal,
      error: mealError,
      data: mealData,
    },
  ] = useMutation(UPSERT_MEAL)

  const [
    setMealIngs,
    { called: calledMealIngs, loading: loadingMealIngs, error: mealIngsError },
  ] = useMutation(SET_INGREDIENTS)

  const [redirect, setRedirect] = useState(false)

  if (redirect) return <Redirect push to="/meals" />

  const saveChanges = () => {
    // Ingredients firt, the rest follows on once completed
    const ingredients: Immutable.List<IngredientInsert> = props.mealIngredients
      .map((mi: MealIngredient) => mi.ingredient)
      .map((i: Ingredient) => prepareIngredientForInsert(i))
    upsertIngredients({
      variables: {
        ingredients: ingredients,
      },
    })
  }

  if (
    calledIngredients &&
    !loadingIngredients &&
    !ingredientsError &&
    !calledMeal
  ) {
    const meal = {
      meal_id: props.mealId,
      description: props.description,
      serves: props.serves,
      diet_type: props.dietType,
      recipe_book: props.recipeBook,
      image_url: props.imageUrl,
    }
    upsertMeal({
      variables: {
        meal: meal,
      },
    })
  }

  if (calledMeal && !loadingMeal && !mealError && !calledMealIngs) {
    const mealId = mealData.insert_meal.returning[0].meal_id
    // This is the returned list of ids and descriptions from the API
    const ingResponse: Immutable.Set<Ingredient> = Immutable.Set(
      ingredientsData.insert_ingredient.returning
    )
    // Now we have to merge that returned info with the quantity and unit info from the UI.
    // We try to match on either the id (exisitng ings) or the description (new ings)
    const getIngredientId = (desc: string): number =>
      ingResponse.find((i) => i.description === desc)!.ingredient_id!
    const mis = Immutable.Set(props.mealIngredients)
    const newMealIngredients = mis.map((mi) =>
      mi.ingredient.ingredient_id
        ? mi
        : {
            ...mi,
            ingredient: {
              ...mi.ingredient,
              ingredient_id: getIngredientId(mi.ingredient.description),
            },
          }
    )
    const miInsert = newMealIngredients.map((nmi) => ({
      meal_id: mealId,
      ingredient_id: nmi.ingredient.ingredient_id,
      quantity: nmi.quantity,
      unit_id: nmi.unit.unit_id,
      default_question_mark: nmi.default_question_mark,
    }))
    setMealIngs({
      variables: {
        mealId: mealId,
        mealIngredients: miInsert,
      },
    })
  }

  if (calledMealIngs && !loadingMealIngs && !mealIngsError) setRedirect(true)

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.margin}
      startIcon={<SaveIcon />}
      onClick={() => saveChanges()}
      disabled={props.errorsExist || loadingIngredients || loadingMeal}
    >
      Save
    </Button>
  )
}

export default CommitChangesButton
