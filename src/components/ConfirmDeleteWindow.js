import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { DELETE_MEAL } from "../api/mealListApiOperations"
import DialogBox from "./DialogBox"

const ConfirmDeleteWindow = (props) => {
  const [deleteMeal, { loading: deleting, error: deleteError }] = useMutation(
    DELETE_MEAL
  )

  return (
    <DialogBox
      action={() =>
        deleteMeal({
          variables: { meal_id: props.mealId },
        })
      }
      handleClose={props.handleClose}
      open={props.open}
      waiting={deleting}
      actionError={deleteError}
      message={`Are you sure you want to delete ${props.description}?`}
    />
  )
}

export default ConfirmDeleteWindow
