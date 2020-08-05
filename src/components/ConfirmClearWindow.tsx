import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { TICK_ALL } from "../api/shoppingListApiOperations"
import DialogBox from "./DialogBox"

interface Props {
  handleClose(): any
  open: boolean
}

const ConfirmWindow = (props: Props) => {
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
      actionError={deleteError ? deleteError.message : ""}
      message="Are you sure you want to clear all items?"
    />
  )
}

export default ConfirmWindow
