import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLastTickedItem } from "../state/actions"
import DisplayIngredient from "./DisplayIngredient"

const ShoppingListItem = (props) => {
  const li = props.item
  const toggleItemApi = props.toggleItem
  const lastTickedId = useSelector((state) => state.lastTickedId)
  const dispatch = useDispatch()

  const toggleItem = (id, checked) => {
    dispatch(setLastTickedItem(id))
    toggleItemApi(id, checked)
  }

  return (
    <DisplayIngredient
      item={li}
      index={props.index}
      checkboxTooltipText="Check off item"
      checked={li.item_id === lastTickedId}
      questionMark={li.question_mark}
      toggleItem={toggleItem}
      toggleQuestionMark={() =>
        props.toggleQuestionMark(li.item_id, !li.question_mark)
      }
      editAction={props.editListItem}
      allowActions={true}
      questionMarkDisabled={false}
    />
  )
}

export default ShoppingListItem
