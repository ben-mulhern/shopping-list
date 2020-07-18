import React, { useState } from "react"
import { useSubscription } from "@apollo/react-hooks"
import MealCard from "./MealCard"
import { useDispatch } from "react-redux"
import { setTab } from "../state/actions"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import Button from "@material-ui/core/Button"
import mealSearch from "../domain/mealSearch"
import AddIcon from "@material-ui/icons/Add"
import { withRouter } from "react-router-dom"
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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const MealCards = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  dispatch(setTab(1))

  const { loading, error, data } = useSubscription(MEAL_SUBSCRIPTION)
  const {
    loading: loadingSelected,
    error: errorSelected,
    data: dataSelected,
  } = useSubscription(SELECTED_MEALS_SUBSCRIPTION)

  const [searchString, setSearchString] = useState("")
  const [planOnly, setPlanOnly] = useState(false)

  if (loading || loadingSelected)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (error || errorSelected) return <p>Error :(</p>

  const meals = Immutable.List(data.meal)
  const selectedMeals = Immutable.List(
    dataSelected.meal_ingredient_plan_item
  ).map((m) => m.meal_id)
  console.log(JSON.stringify(selectedMeals))

  return (
    <div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search meals"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <IconButton className={classes.iconButton}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => props.history.push("/meal/new")}
      >
        New meal
      </Button>
      <AddMealsButton meals={selectedMeals} />
      <FormControl component="fieldset" className={classes.margin}>
        <FormLabel component="legend">Plan-only</FormLabel>
        <Switch
          value={planOnly}
          checked={planOnly}
          color="secondary"
          disabled={selectedMeals.size === 0}
          onChange={(e) => setPlanOnly(e.target.checked)}
        />
      </FormControl>
      <div>
        {meals.map((m) => (
          <MealCard
            meal={m}
            key={m.meal_id}
            hidden={
              (planOnly && !selectedMeals.includes(m.meal_id)) ||
              !mealSearch(searchString, m)
            }
            selected={selectedMeals.includes(m.meal_id)}
          />
        ))}
      </div>
    </div>
  )
}

export default withRouter(MealCards)
