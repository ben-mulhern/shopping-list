import React from "react"
import { useDispatch } from "react-redux"
import { setTab, storeStaticData } from "../state/actions"
import { useLazyQuery, useQuery } from "@apollo/react-hooks"
import MealDetailForm from "./MealDetailForm"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import { QUERY_STATIC_DATA } from "../api/staticDataApiOperations"
import { MEAL_QUERY } from "../api/mealListApiOperations"
import Immutable from "immutable"

const EMPTY_MEAL = {
  description: "",
  diet_type: "OMNI",
  leftovers: false,
  image_url: null,
  serves: 4,
  recipe_book: null,
  meal_tags: [],
  meal_ingredients: [],
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

const MealDetail = (props) => {
  const dispatch = useDispatch()
  dispatch(setTab(1))
  const mealId = props.match.params.id
  const classes = useStyles()

  const {
    loading: staticLoading,
    error: staticError,
    data: staticData,
  } = useQuery(QUERY_STATIC_DATA, { fetchPolicy: "no-cache" })

  const [runMealQuery, { called, loading, error, data }] = useLazyQuery(
    MEAL_QUERY,
    {
      variables: { meal_id: mealId },
      fetchPolicy: "no-cache",
    }
  )

  if (!staticLoading) {
    const units = Immutable.List(staticData.unit)
    const locations = Immutable.List(staticData.store_location)
    const ingredients = Immutable.List(staticData.ingredient)
    dispatch(storeStaticData(units, locations, ingredients))
  }

  if (!called && mealId !== "new") runMealQuery()

  if (loading || staticLoading)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (error || staticError) return <p>Error :(</p>

  const meal = called ? data.meal[0] : EMPTY_MEAL

  return <MealDetailForm meal={meal} />
}

export default MealDetail
