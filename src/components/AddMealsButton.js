import React from "react"
import Button from "@material-ui/core/Button"
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd"
import { makeStyles } from "@material-ui/core/styles"
import Immutable from "immutable"
import { gql } from "apollo-boost"
import { useLazyQuery } from "@apollo/react-hooks"

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
}))

const MEAL_INGREDIENT_QUERY = gql`
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
  }
`

const SHOPPING_LIST_QUERY = gql`
  query {
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
    getIngredientsQuery,
    {
      called: calledIngs,
      loading: loadingIngs,
      error: errorIngs,
      data: dataIngs,
    },
  ] = useLazyQuery(MEAL_INGREDIENT_QUERY, { fetchPolicy: "no-cache" })

  const [
    getShoppingListQuery,
    {
      called: calledList,
      loading: loadingList,
      error: errorList,
      data: dataList,
    },
  ] = useLazyQuery(SHOPPING_LIST_QUERY, { fetchPolicy: "no-cache" })

  // Get the meal ids
  const ids = props.meals

  const addToList = () => {
    // Get the meal ingredients and the existing shopping list items
    getIngredientsQuery({
      variables: {
        mealIds: ids,
      },
    })
    getShoppingListQuery()
  }

  // if called and finished loading boths lists and neither has errored
  if (
    calledIngs &&
    !loadingIngs &&
    !errorIngs &&
    calledList &&
    !loadingList &&
    !errorList
  ) {
    const a = Immutable.List(dataIngs.meal_ingredient).map((i) => ({
      id: i.ingredient.ingredient_id,
      unit: i.unit.unit_id,
      quantity: i.quantity,
      question_mark: false,
    }))
    const b = Immutable.List(dataList.shopping_list_item).map((i) => ({
      id: i.ingredient.ingredient_id,
      unit: i.unit.unit_id,
      quantity: i.quantity,
      question_mark: i.question_mark,
    }))
    const allItems = a.concat(b)
    const group = allItems.groupBy((i) => i.id + i.unit)
    console.log(`${allItems.size} ${group.size}`)
    // const sums = group.map(g => ({id: g.}))
    console.log(JSON.stringify(group))
    // Condense and sum quantities. Question marks are preserved
    // Wipe shopping list
    // Reinsert shopping list
    // Redirect to list page
  }

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      disabled={ids.size === 0}
      startIcon={<PlaylistAddIcon />}
      onClick={addToList}
    >
      Compile
    </Button>
  )
}

export default AddMealsButton
