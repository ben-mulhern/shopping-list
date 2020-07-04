import React, { useState } from "react"
import UndoIcon from "@material-ui/icons/Undo"
import IconButton from "@material-ui/core/IconButton"
import { useMutation, useSubscription } from "@apollo/react-hooks"
import {
  GET_LAST_TICKED_ITEM,
  UNTICK_ITEM,
} from "../api/shoppingListApiOperations"
import CircularProgress from "@material-ui/core/CircularProgress"
import { connect } from "react-redux"
import { setLastTickedItem } from "../state/actions"

const UndoButton = (props) => {
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
    <IconButton
      variant="outlined"
      color="secondary"
      disabled={disableButton}
      onClick={() => restoreLastItem()}
    >
      <UndoIcon />
    </IconButton>
  )
}

const mapDispatchToProps = (dispatch) => ({
  untickLastItem: () => dispatch(setLastTickedItem(0)),
})

export default connect(null, mapDispatchToProps)(UndoButton)
