import React, { useState } from "react"
import { connect } from "react-redux"
import { setTab } from "../state/actions"
import { useSubscription, useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import Immutable from "immutable"
import { QUERY_STATIC_DATA } from "../api/queries"
import { TICK_ITEM, UNTICK_ITEM, SET_QUESTION_MARK } from "../api/listMutations"
import IconButton from "@material-ui/core/IconButton"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Checkbox from "@material-ui/core/Checkbox"
import Paper from "@material-ui/core/Paper"
import HelpIcon from "@material-ui/icons/Help"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import MealIngredient from "./MealIngredient"
import UndoButton from "./UndoButton"
import { emptyMealIngredient } from "../domain/sharedValues"

const listSubscription = gql`
  subscription {
    shopping_list_item(
      where: { ticked_at: { _is_null: true } }
      order_by: [
        { ingredient: { store_location: { shop_order: asc } } }
        { ingredient: { ingredient_id: asc } }
      ]
    ) {
      item_id
      quantity
      ticked_at
      question_mark
      unit {
        unit_id
      }
      ingredient {
        ingredient_id
        description
        store_location {
          store_location_id
          shop_order
        }
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  width300: {
    minWidth: 300,
    maxWidth: 600,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const ShoppingList = (props) => {
  const classes = useStyles()
  props.setTab(0)

  const { loading, error, data } = useSubscription(listSubscription)

  const [tickItem, { error: tickError }] = useMutation(TICK_ITEM)
  const [untickItem, { error: untickError }] = useMutation(UNTICK_ITEM)
  const [setQuestionMark, { error: questionMarkError }] = useMutation(
    SET_QUESTION_MARK
  )

  const {
    loading: staticLoading,
    error: staticError,
    data: staticData,
  } = useQuery(QUERY_STATIC_DATA, { fetchPolicy: "no-cache" })

  const [questionMarksOnly, setQuestionMarksOnly] = useState(false)
  const [addMode, setAddMode] = useState(false)

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

  if (loading || staticLoading)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (error || staticError || tickError || untickError || questionMarkError)
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
    </div>
  )

  const mealIngredient = (
    <MealIngredient
      mealIngredient={emptyMealIngredient}
      units={staticData.unit}
      locations={staticData.store_location}
      ingredients={staticData.ingredient}
      deleteIngredient={() => setAddMode(false)}
      editIngredient={() => {}}
    />
  )

  return (
    <div>
      {addMode ? mealIngredient : buttons}

      <Paper className={classes.width300}>
        <List>
          {items
            .filter((i) => !questionMarksOnly || i.question_mark)
            .map((li, i) => (
              <ListItem dense button key={i}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    color="primary"
                    disableRipple
                    checked={!!li.ticked_at}
                    onChange={(e) => toggleItem(li.item_id, e.target.checked)}
                  />
                </ListItemIcon>
                <IconButton
                  onClick={() =>
                    toggleQuestionMark(li.item_id, !li.question_mark)
                  }
                >
                  {li.question_mark ? (
                    <HelpIcon color="secondary" />
                  ) : (
                    <HelpOutlineIcon />
                  )}
                </IconButton>
                <ListItemText
                  primary={`${li.quantity}${li.unit.unit_id} ${li.ingredient.description}`}
                />
              </ListItem>
            ))}
        </List>
      </Paper>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setTab: (index) => dispatch(setTab(index)),
})

export default connect(null, mapDispatchToProps)(ShoppingList)
