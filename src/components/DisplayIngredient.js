import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import HelpIcon from "@material-ui/icons/Help"
import ListItemText from "@material-ui/core/ListItemText"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import Tooltip from "@material-ui/core/Tooltip"

const DisplayIngredient = (props) => {
  const item = props.item

  const checkBox = (
    <Tooltip title={props.checkboxTooltipText}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          color="primary"
          disableRipple
          checked={props.checked}
          onChange={props.toggleItem}
        />
      </ListItemIcon>
    </Tooltip>
  )
  const questionMarkToggle = (
    <Tooltip
      title={
        props.questionMark
          ? "Mark as definitely needed"
          : "Mark as need to check"
      }
    >
      <span>
        <IconButton
          onClick={props.toggleQuestionMark}
          disabled={props.questionMarkDisabled}
        >
          {props.questionMark ? (
            <HelpIcon color="secondary" />
          ) : (
            <HelpOutlineIcon />
          )}
        </IconButton>
      </span>
    </Tooltip>
  )

  return (
    <ListItem dense button key={props.index}>
      {props.allowActions && checkBox}
      {props.allowActions && questionMarkToggle}
      <ListItemText
        primary={`${item.quantity}${item.unit.unit_id} ${item.ingredient.description}`}
        onClick={() => props.editAction(item)}
      />
    </ListItem>
  )
}

export default DisplayIngredient
