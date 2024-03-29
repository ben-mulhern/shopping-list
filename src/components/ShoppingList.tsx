import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setTab, storeStaticData } from "../state/actions"
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
import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import EditableMealIngredient from "./EditableMealIngredient"
import UndoButton from "./UndoButton"
import { EMPTY_SHOPPING_LIST_ITEM } from "../domain/sharedValues"
import DisplayShoppingListItem from "./DisplayShoppingListItem"
import ClearIcon from "@material-ui/icons/Clear"
import ConfirmClearWindow from "./ConfirmClearWindow"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import Tooltip from "@material-ui/core/Tooltip"
import {
  Ingredient,
  ShoppingListItem,
  EditableItem,
  Unit,
  StoreLocation,
} from "../domain/shoppingListTypes"
import {
  shoppingListItemToEditableItemConverter,
  editableItemToShoppingListItemConverter,
} from "../domain/editableItemConverters"

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

const ShoppingList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  dispatch(setTab(0))

  const { loading, error, data } = useSubscription(SHOPPING_LIST_SUBSCRIPTION)

  const [tickItem, { error: tickError }] = useMutation(TICK_ITEM)
  const [untickItem, { error: untickError }] = useMutation(UNTICK_ITEM)
  const [saveEditItem, { error: saveError }] = useMutation(UPSERT_LIST_ITEM)
  const [setQuestionMark, { error: questionMarkError }] =
    useMutation(SET_QUESTION_MARK)
  const [updateIngredient, { error: ingError }] =
    useMutation(UPSERT_INGREDIENTS)

  const {
    loading: staticLoading,
    error: staticError,
    data: staticData,
  } = useQuery(QUERY_STATIC_DATA, { fetchPolicy: "no-cache" })

  const [questionMarksOnly, setQuestionMarksOnly] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [editItem, setEditItem] = useState(
    EMPTY_SHOPPING_LIST_ITEM as ShoppingListItem
  )
  const [clearAllWindowOpen, setClearAllWindowOpen] = useState(false)

  if (!staticLoading) {
    const units: Immutable.List<Unit> = Immutable.List(staticData.unit)
    const locations: Immutable.List<StoreLocation> = Immutable.List(
      staticData.store_location
    )
    const ingredients: Immutable.List<Ingredient> = Immutable.List(
      staticData.ingredient
    )
    dispatch(storeStaticData(units, locations, ingredients))
  }

  const toggleItem = (id: number, checked: boolean) => {
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

  const toggleQuestionMark = (id: number, qm: boolean) => {
    setQuestionMark({
      variables: {
        itemId: id,
        questionMark: qm,
      },
    })
  }

  const handleItemEdit = (i: number, ei: EditableItem) => {
    const sli = editableItemToShoppingListItemConverter(ei)
    setEditItem(sli)
  }

  const stopEdits = () => {
    setEditItem(EMPTY_SHOPPING_LIST_ITEM)
    setAddMode(false)
  }

  const handleSetItem = () => {
    const id = editItem.ingredient.ingredient_id
    // If the ingredient is pre-existing but has changed store location - update store location
    if (!!id) {
      // Lookup the current location
      const id = editItem.ingredient.ingredient_id
      const ings: Immutable.List<Ingredient> = Immutable.List(
        staticData.ingredient
      )
      const originalLocationId = ings.find((i) => i.ingredient_id === id)!
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

  const editListItem = (i: ShoppingListItem) => {
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

  const items: Immutable.List<ShoppingListItem> = Immutable.List(
    data.shopping_list_item
  )

  const buttons = (
    <div>
      <Tooltip title="Add a new list item">
        <Fab
          className={classes.margin}
          color="primary"
          onClick={() => setAddMode(true)}
          size="small"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <UndoButton />
      <Tooltip
        title={
          questionMarksOnly
            ? "Show all unticked items"
            : "Show only question marks"
        }
      >
        <Fab
          className={classes.margin}
          color={questionMarksOnly ? "secondary" : "default"}
          onClick={() => setQuestionMarksOnly(!questionMarksOnly)}
          size="small"
        >
          <HelpOutlineIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Clear entire list">
        <Fab
          className={classes.margin}
          color="secondary"
          onClick={() => setClearAllWindowOpen(true)}
          size="small"
          disabled={items.size === 0}
        >
          <ClearIcon />
        </Fab>
      </Tooltip>
      <ConfirmClearWindow
        open={clearAllWindowOpen}
        handleClose={() => setClearAllWindowOpen(false)}
      />
    </div>
  )

  const mealIngredient = (
    <EditableMealIngredient
      key={1}
      index={1}
      mealIngredient={shoppingListItemToEditableItemConverter(editItem)}
      deleteIngredient={stopEdits}
      editItem={handleItemEdit}
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
            .map((li) =>
              li.item_id === editItem.item_id ? (
                mealIngredient
              ) : (
                <DisplayShoppingListItem
                  key={li.item_id}
                  index={li.item_id!}
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
export default ShoppingList
