import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd"
import { makeStyles } from "@material-ui/core/styles"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import shoppingListBuilder from "../domain/shoppingListBuilder"
import {
  REINSERT_LIST,
  LIST_DATA_QUERY,
} from "../api/shoppingListApiOperations"
import { Redirect } from "react-router"
import { CLEAR_PLAN } from "../api/mealListApiOperations"
import { useDispatch } from "react-redux"
import { togglePlanOnlyMode } from "../state/actions"

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
}))

interface Props {
  mealCount: number
}

const AddMealsButton = (props: Props) => {
  const classes = useStyles()
  const [
    getListDataQuery,
    {
      called: calledIngs,
      loading: loadingIngs,
      error: errorIngs,
      data: dataIngs,
    },
  ] = useLazyQuery(LIST_DATA_QUERY, {
    fetchPolicy: "network-only",
  })

  const [reinsertList, { loading: loadingRil }] = useMutation(REINSERT_LIST)
  const [clearPlan] = useMutation(CLEAR_PLAN)
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()

  if (redirect) return <Redirect push to="/list" />

  // if called and finished loading boths lists and neither has errored
  if (calledIngs && !loadingIngs && !errorIngs) {
    const newList = shoppingListBuilder(
      dataIngs.meal_ingredient_plan_item,
      dataIngs.shopping_list_item,
      dataIngs.meal_plan_count
    )
    console.log(JSON.stringify(newList))
    reinsertList({
      variables: {
        items: newList,
      },
    })
    clearPlan()
    dispatch(togglePlanOnlyMode(false))
    setRedirect(true)
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      disabled={props.mealCount === 0 || loadingRil}
      startIcon={<PlaylistAddIcon />}
      onClick={() => getListDataQuery()}
    >
      Compile
    </Button>
  )
}

export default AddMealsButton
