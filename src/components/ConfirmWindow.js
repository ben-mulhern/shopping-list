import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmWindow = props => {
  const [open, setOpen] = useState(props.activated)
  const [closeRequested, setCloseRequested] = useState(false)

  const handleClose = () => {
    setCloseRequested(true)
    setOpen(false)
  }
  
  if (props.activated && !open && !closeRequested) {
    setOpen(props.activated && !open && !closeRequested)
  } 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">Confirm delete?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.deleteMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose} color="primary">
          Confirm
        </Button>        
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default ConfirmWindow