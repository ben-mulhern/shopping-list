import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLastTickedItem } from "../state/actions"
import DisplayIngredient from "./DisplayIngredient"
import { ShoppingListItem } from "../domain/shoppingListTypes"
import { RootState } from "../state/RootState"

interface Props {
  item: ShoppingListItem
  toggleItem(id: number, checked: boolean): any
  index: number
  toggleQuestionMark(id: number, checked: boolean): any
  editListItem(item: ShoppingListItem): any
}

const DisplayShoppingListItem = (props: Props) => {
  const li = props.item
  const toggleItemApi = props.toggleItem
  const lastTickedId = useSelector((state: RootState) => state.lastTickedId)
  const dispatch = useDispatch()

  const toggleItem = (id: number, checked: boolean) => {
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
      toggleItem={() => toggleItem(li.item_id!, !(li.item_id === lastTickedId))}
      toggleQuestionMark={() =>
        props.toggleQuestionMark(li.item_id!, !li.question_mark)
      }
      editAction={() => props.editListItem(li)}
      allowActions={true}
      questionMarkDisabled={false}
    />
  )
}

export default DisplayShoppingListItem
