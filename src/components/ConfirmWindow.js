import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmWindow = props => {

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle id="alert-dialog-title">Confirm delete?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.deleteMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Confirm
        </Button>        
        <Button onClick={props.handleClose} color="default">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default ConfirmWindow