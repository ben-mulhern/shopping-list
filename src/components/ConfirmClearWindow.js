import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useMutation } from "@apollo/react-hooks"
import CircularProgress from "@material-ui/core/CircularProgress"
import { TICK_ALL } from "../api/shoppingListApiOperations"

const ConfirmWindow = (props) => {
  const [tickAll, { loading: deleting, error: deleteError }] = useMutation(
    TICK_ALL
  )

  const deleteAndClose = () => {
    tickAll()
    props.handleClose()
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle id="alert-dialog-title">Confirm delete?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {deleting ? (
            <CircularProgress color="secondary" />
          ) : deleteError ? (
            `${deleteError}`
          ) : (
            `Are you sure you want to clear all items?`
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteAndClose} color="primary" disabled={deleting}>
          Confirm
        </Button>
        <Button onClick={props.handleClose} color="default" disabled={deleting}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmWindow
