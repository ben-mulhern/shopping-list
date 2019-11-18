import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import CircularProgress from '@material-ui/core/CircularProgress'

const DELETE_MEAL = gql`
  mutation delete_meal($meal_id: Int!) {
    delete_meal(where: {meal_id: {_eq: $meal_id}}) {
      affected_rows
    }
  }
`

const ConfirmWindow = props => {

  const [deleteMeal, { loading: deleting, error: deleteError }] = useMutation(DELETE_MEAL)

  const deleteAndClose = () => {
    deleteMeal({
      variables: { meal_id: props.mealId }
    })
    props.onDelete()
    props.handleClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle id="alert-dialog-title">Confirm delete?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {(deleting ? 
           <CircularProgress color="secondary" /> :
           (deleteError ? `${deleteError}` :
           `Are you sure you want to delete ${props.description}?`))}
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