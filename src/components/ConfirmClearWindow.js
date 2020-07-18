import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { TICK_ALL } from "../api/shoppingListApiOperations"
import DialogBox from "./DialogBox"

const ConfirmWindow = (props) => {
  const [tickAll, { loading: deleting, error: deleteError }] = useMutation(
    TICK_ALL
  )

  const tickAllItems = () => {
    const now = new Date()
    tickAll({
      variables: {
        ts: now.toJSON(),
      },
    })
  }

  return (
    <DialogBox
      action={() => tickAllItems()}
      handleClose={props.handleClose}
      open={props.open}
      waiting={deleting}
      actionError={deleteError}
      message="Are you sure you want to clear all items?"
    />
  )
}

export default ConfirmWindow
