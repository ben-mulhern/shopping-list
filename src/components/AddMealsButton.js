import React from "react"
import Button from "@material-ui/core/Button"
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
}))

const AddMealsButton = (props) => {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      disabled={props.meals.size === 0}
      startIcon={<PlaylistAddIcon />}
    >
      Add meals to list
    </Button>
  )
}

export default AddMealsButton
