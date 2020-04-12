import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  width300: {
    minWidth: 300,
    maxWidth: 600
  }
}))

const ListItem = (props) => {

  const item = props.item
  const classes = useStyles()

  return <Paper className={classes.width300}>
    <Checkbox
      color="primary"
      />
    <p>{item.quantity} {item.unit.unit_id} {item.ingredient.description}</p>
  </Paper>

}

export default ListItem