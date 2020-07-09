import React, { useState } from "react"
import UndoIcon from "@material-ui/icons/Undo"
import { useMutation, useSubscription } from "@apollo/react-hooks"
import {
  GET_LAST_TICKED_ITEM,
  UNTICK_ITEM,
} from "../api/shoppingListApiOperations"
import CircularProgress from "@material-ui/core/CircularProgress"
import { connect } from "react-redux"
import { setLastTickedItem } from "../state/actions"
import Fab from "@material-ui/core/Fab"
import { makeStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

const UndoButton = (props) => {
  const classes = useStyles()
  const [disableButton, setDisableButton] = useState(false)

  const { loading: loadingSub, data: dataSub } = useSubscription(
    GET_LAST_TICKED_ITEM
  )

  const [untickItem, { loading: loadingUti }] = useMutation(UNTICK_ITEM)

  // Enable button when not loading
  if (!loadingSub && !loadingUti && disableButton) setDisableButton(false)
  // Disable button when loading
  if (!disableButton && (loadingSub || loadingUti)) setDisableButton(true)

  const restoreLastItem = () => {
    props.untickLastItem()
    if (!loadingSub && dataSub.shopping_list_item.length !== 0) {
      const itemId = dataSub.shopping_list_item[0].item_id
      untickItem({
        variables: {
          itemId: itemId,
        },
      })
    }
  }

  if (loadingSub || loadingUti) return <CircularProgress color="secondary" />

  return (
    <Tooltip title="Restore last ticked item">
      <Fab
        className={classes.margin}
        color="secondary"
        onClick={() => restoreLastItem()}
        disabled={disableButton}
        size="small"
      >
        <UndoIcon />
      </Fab>
    </Tooltip>
  )
}

const mapDispatchToProps = (dispatch) => ({
  untickLastItem: () => dispatch(setLastTickedItem(0)),
})

export default connect(null, mapDispatchToProps)(UndoButton)
