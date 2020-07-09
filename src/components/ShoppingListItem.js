import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import HelpIcon from "@material-ui/icons/Help"
import ListItemText from "@material-ui/core/ListItemText"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { connect } from "react-redux"
import { setLastTickedItem } from "../state/actions"
import Tooltip from "@material-ui/core/Tooltip"

const ShoppingListItem = (props) => {
  const i = props.index
  const li = props.item
  const toggleItemApi = props.toggleItem
  const toggleQuestionMark = props.toggleQuestionMark
  const editListItem = props.editListItem

  const toggleItem = (id, checked) => {
    console.log(`calling the action with id ${id}`)
    props.setLastTickedItem(id)
    toggleItemApi(id, checked)
  }

  return (
    <ListItem dense button key={i}>
      <Tooltip title="Check off item">
        <ListItemIcon>
          <Checkbox
            edge="start"
            color="primary"
            disableRipple
            checked={li.item_id === props.lastTickedId}
            onChange={(e) => toggleItem(li.item_id, e.target.checked)}
          />
        </ListItemIcon>
      </Tooltip>
      <Tooltip
        title={
          li.question_mark
            ? "Mark as definitely needed"
            : "Mark as need to check"
        }
      >
        <IconButton
          onClick={() => toggleQuestionMark(li.item_id, !li.question_mark)}
        >
          {li.question_mark ? (
            <HelpIcon color="secondary" />
          ) : (
            <HelpOutlineIcon />
          )}
        </IconButton>
      </Tooltip>
      <ListItemText
        primary={`${li.quantity}${li.unit.unit_id} ${li.ingredient.description}`}
        onClick={() => editListItem(li)}
      />
    </ListItem>
  )
}

const mapStateToProps = (state) => {
  return {
    lastTickedId: state.lastTickedId,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLastTickedItem: (id) => dispatch(setLastTickedItem(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItem)
