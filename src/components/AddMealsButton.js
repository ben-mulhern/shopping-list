import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd"
import { makeStyles } from "@material-ui/core/styles"
import { gql } from "apollo-boost"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import shoppingListBuilder from "../domain/shoppingListBuilder"
import { REINSERT_LIST } from "../api/listMutations"
import { Redirect } from "react-router"
import { connect } from "react-redux"
import { clearSelectedMeals } from "../state/actions"

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
}))

const LIST_DATA_QUERY = gql`
  query getMealIngredients($mealIds: [Int!]!) {
    meal_ingredient(where: { meal_id: { _in: $mealIds } }) {
      ingredient {
        ingredient_id
      }
      unit {
        unit_id
      }
      quantity
    }
    shopping_list_item(where: { ticked_at: { _is_null: true } }) {
      quantity
      unit {
        unit_id
      }
      question_mark
      ingredient {
        ingredient_id
      }
    }
  }
`

const AddMealsButton = (props) => {
  const classes = useStyles()

  const [
    getListDataQuery,
    {
      called: calledIngs,
      loading: loadingIngs,
      error: errorIngs,
      data: dataIngs,
    },
  ] = useLazyQuery(LIST_DATA_QUERY, { fetchPolicy: "no-cache" })

  const [reinsertList, { loading: loadingRil }] = useMutation(REINSERT_LIST)

  const [redirect, setRedirect] = useState(false)

  if (redirect) return <Redirect push to="/list" />

  // Get the meal ids
  const ids = props.meals

  const addToList = () => {
    // Get the meal ingredients and the existing shopping list items
    getListDataQuery({
      variables: {
        mealIds: ids,
      },
    })
  }

  // if called and finished loading boths lists and neither has errored
  if (calledIngs && !loadingIngs && !errorIngs) {
    console.log("Building fresh list")
    const newList = shoppingListBuilder(
      dataIngs.meal_ingredient,
      dataIngs.shopping_list_item
    )
    reinsertList({
      variables: {
        items: newList,
      },
    })
    props.clearSelectedMeals()
    setRedirect(true)
  }

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      disabled={ids.size === 0 || loadingRil}
      startIcon={<PlaylistAddIcon />}
      onClick={addToList}
    >
      Compile
    </Button>
  )
}

const mapDispatchToProps = (dispatch) => ({
  clearSelectedMeals: () => dispatch(clearSelectedMeals()),
})

export default connect(null, mapDispatchToProps)(AddMealsButton)
