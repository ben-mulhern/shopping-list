import React from "react"
import { useSubscription } from "@apollo/react-hooks"
import MealCard from "./MealCard"
import { useDispatch, useSelector } from "react-redux"
import { setTab } from "../state/actions"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import { withRouter, RouteComponentProps } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import Immutable from "immutable"
import AddMealsButton from "./AddMealsButton"
import {
  MEAL_SUBSCRIPTION,
  SELECTED_MEALS_SUBSCRIPTION,
} from "../api/mealListApiOperations"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Switch from "@material-ui/core/Switch"
import { togglePlanOnlyMode } from "../state/actions"
import { RootState } from "../state/RootState"
import { Meal, MealIngredientPlanItem } from "../domain/shoppingListTypes"
import Searchbox from "./Searchbox"
import mealSearch from "../domain/mealSearch"

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

interface Props extends RouteComponentProps {}

const MealCards = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  dispatch(setTab(1))
  const planOnly = useSelector((state: RootState) => state.planOnlyMode)
  const searchString = useSelector((state: RootState) => state.searchString)

  const { loading, error, data } = useSubscription(MEAL_SUBSCRIPTION)

  const {
    loading: loadingSelected,
    error: errorSelected,
    data: dataSelected,
  } = useSubscription(SELECTED_MEALS_SUBSCRIPTION)

  //console.log("Error is " + JSON.stringify(error) ?? "undefined")

  if (loading || loadingSelected)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (error || errorSelected) return <p>Error :(</p>

  const meals: Immutable.List<Meal> = Immutable.List(data.meal)
  const selectedItems: Immutable.List<MealIngredientPlanItem> = Immutable.List(
    dataSelected.meal_ingredient_plan_item
  )
  const selectedMeals: Immutable.Set<number> = selectedItems
    .map((i) => i.meal_id!)
    .toSet()

  return (
    <div>
      <Searchbox />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => props.history.push("/meal/new")}
      >
        New meal
      </Button>
      <AddMealsButton mealCount={selectedMeals.size} />
      <FormControl component="fieldset" className={classes.margin}>
        <FormLabel component="legend">Plan-only</FormLabel>
        <Switch
          value={planOnly}
          checked={planOnly}
          color="secondary"
          disabled={selectedMeals.size === 0 && !planOnly}
          onChange={() => dispatch(togglePlanOnlyMode(!planOnly))}
        />
      </FormControl>
      <div>
        {meals
          .filter((m) => mealSearch(searchString, m))
          .map((m) => (
            <MealCard
              meal={m}
              key={m.meal_id}
              selected={selectedMeals.includes(m.meal_id)}
            />
          ))}
      </div>
    </div>
  )
}

export default withRouter(MealCards)
