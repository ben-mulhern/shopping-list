import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import HelpIcon from "@material-ui/icons/Help"
import ListItemText from "@material-ui/core/ListItemText"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

const ShoppingListItem = (props) => {
  const i = props.index
  const li = props.item
  const toggleItem = props.toggleItem
  const toggleQuestionMark = props.toggleQuestionMark
  const editListItem = props.editListItem

  return (
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
        onClick={() => toggleQuestionMark(li.item_id, !li.question_mark)}
      >
        {li.question_mark ? (
          <HelpIcon color="secondary" />
        ) : (
          <HelpOutlineIcon />
        )}
      </IconButton>
      <ListItemText
        primary={`${li.quantity}${li.unit.unit_id} ${li.ingredient.description}`}
        onClick={() => editListItem(li)}
      />
    </ListItem>
  )
}

export default ShoppingListItem
