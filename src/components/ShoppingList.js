import React, { useState } from "react"
import { connect } from "react-redux"
import { setTab } from "../state/actions"
import { useSubscription, useQuery, useMutation } from "@apollo/react-hooks"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import Immutable from "immutable"
import { QUERY_STATIC_DATA } from "../api/staticDataApiOperations"
import {
  TICK_ITEM,
  UNTICK_ITEM,
  SET_QUESTION_MARK,
  UPSERT_LIST_ITEM,
  SHOPPING_LIST_SUBSCRIPTION,
} from "../api/shoppingListApiOperations"
import { UPSERT_INGREDIENTS } from "../api/mealListApiOperations"
import IconButton from "@material-ui/core/IconButton"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import HelpIcon from "@material-ui/icons/Help"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import MealIngredient from "./MealIngredient"
import UndoButton from "./UndoButton"
import { EMPTY_MEAL_INGREDIENT } from "../domain/sharedValues"
import ShoppingListItem from "./ShoppingListItem"
import ClearIcon from "@material-ui/icons/Clear"
import ConfirmClearWindow from "./ConfirmClearWindow"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  width300: {
    minWidth: 300,
    maxWidth: 700,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const ShoppingList = (props) => {
  const classes = useStyles()
  props.setTab(0)

  const { loading, error, data } = useSubscription(SHOPPING_LIST_SUBSCRIPTION)

  const [tickItem, { error: tickError }] = useMutation(TICK_ITEM)
  const [untickItem, { error: untickError }] = useMutation(UNTICK_ITEM)
  const [saveEditItem, { error: saveError }] = useMutation(UPSERT_LIST_ITEM)
  const [setQuestionMark, { error: questionMarkError }] = useMutation(
    SET_QUESTION_MARK
  )
  const [updateIngredient, { error: ingError }] = useMutation(
    UPSERT_INGREDIENTS
  )

  const {
    loading: staticLoading,
    error: staticError,
    data: staticData,
  } = useQuery(QUERY_STATIC_DATA, { fetchPolicy: "no-cache" })

  const [questionMarksOnly, setQuestionMarksOnly] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [editItem, setEditItem] = useState(EMPTY_MEAL_INGREDIENT)
  const [clearAllWindowOpen, setClearAllWindowOpen] = useState(false)

  const toggleItem = (id, checked) => {
    if (checked) {
      const now = new Date()
      tickItem({
        variables: {
          itemId: id,
          ts: now.toJSON(),
        },
      })
    } else {
      untickItem({
        variables: {
          itemId: id,
        },
      })
    }
  }

  const toggleQuestionMark = (id, qm) => {
    setQuestionMark({
      variables: {
        itemId: id,
        questionMark: qm,
      },
    })
  }

  const handleItemEdit = (i, ing) => {
    setEditItem(ing)
  }

  const stopEdits = () => {
    setEditItem(EMPTY_MEAL_INGREDIENT)
    setAddMode(false)
  }

  const handleSetItem = () => {
    const id = editItem.ingredient.ingredient_id
    // If the ingredient is pre-existing but has changed store location - update store location
    if (!!id) {
      // Lookup the current location
      const id = editItem.ingredient.ingredient_id
      const ings = Immutable.List(staticData.ingredient)
      const originalLocationId = ings.find((i) => i.ingredient_id === id)
        .store_location.store_location_id
      if (
        originalLocationId !==
        editItem.ingredient.store_location.store_location_id
      ) {
        const ing = {
          ingredient_id: id,
          description: editItem.ingredient.description,
          store_location_id:
            editItem.ingredient.store_location.store_location_id,
        }
        updateIngredient({
          variables: {
            ingredients: [ing],
          },
        })
      }
    }

    // Build the item
    const item = id
      ? {
          item_id: editItem.item_id,
          quantity: editItem.quantity,
          unit_id: editItem.unit.unit_id,
          question_mark: editItem.question_mark,
          ingredient_id: id,
        }
      : {
          item_id: editItem.item_id,
          quantity: editItem.quantity,
          unit_id: editItem.unit.unit_id,
          question_mark: editItem.question_mark,
          ingredient: {
            data: {
              description: editItem.ingredient.description,
              store_location_id:
                editItem.ingredient.store_location.store_location_id,
            },
          },
        }

    // Upsert the item
    saveEditItem({
      variables: {
        item: item,
      },
    })

    // Restore the add entry to blank and re-show the buttons
    stopEdits()
  }

  const editListItem = (i) => {
    setEditItem(i)
  }

  if (loading || staticLoading)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (
    error ||
    staticError ||
    tickError ||
    untickError ||
    questionMarkError ||
    saveError ||
    ingError
  )
    return <p>Error :(</p>

  const items = Immutable.List(data.shopping_list_item)

  const buttons = (
    <div>
      <IconButton
        variant="outlined"
        color="primary"
        onClick={() => setAddMode(true)}
      >
        <AddCircleIcon />
      </IconButton>
      <UndoButton />
      <IconButton
        variant="outlined"
        onClick={() => setQuestionMarksOnly(!questionMarksOnly)}
      >
        {questionMarksOnly ? (
          <HelpIcon color="secondary" />
        ) : (
          <HelpOutlineIcon />
        )}
      </IconButton>
      <IconButton onClick={() => setClearAllWindowOpen(true)}>
        <ClearIcon color="secondary" />
      </IconButton>
      <ConfirmClearWindow
        open={clearAllWindowOpen}
        handleClose={() => setClearAllWindowOpen(false)}
      />
    </div>
  )

  const mealIngredient = (
    <MealIngredient
      mealIngredient={editItem}
      units={staticData.unit}
      locations={staticData.store_location}
      ingredients={staticData.ingredient}
      deleteIngredient={stopEdits}
      editIngredient={handleItemEdit}
      listMode={true}
      setItem={handleSetItem}
    />
  )

  return (
    <div>
      {addMode ? mealIngredient : buttons}

      <Paper className={classes.width300}>
        <List>
          {items
            .filter((i) => !questionMarksOnly || i.question_mark)
            .map((li, i) =>
              li.item_id === editItem.item_id ? (
                mealIngredient
              ) : (
                <ShoppingListItem
                  key={i}
                  index={i}
                  item={li}
                  toggleItem={toggleItem}
                  toggleQuestionMark={toggleQuestionMark}
                  editListItem={editListItem}
                />
              )
            )}
        </List>
      </Paper>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setTab: (index) => dispatch(setTab(index)),
})

export default connect(null, mapDispatchToProps)(ShoppingList)
