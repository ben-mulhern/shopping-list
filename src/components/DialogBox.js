import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from "@material-ui/core/CircularProgress"

const DialogBox = (props) => {
  const actThenClose = () => {
    props.action()
    props.handleClose()
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle id="alert-dialog-title">Confirm action</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.waiting ? (
            <CircularProgress color="secondary" />
          ) : props.actionError ? (
            `${props.actionError}`
          ) : (
            `${props.message}`
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={actThenClose} color="primary" disabled={props.waiting}>
          Confirm
        </Button>
        <Button
          onClick={props.handleClose}
          color="default"
          disabled={props.waiting}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogBox
