import React, { useState } from "react"
import UndoIcon from "@material-ui/icons/Undo"
import IconButton from "@material-ui/core/IconButton"
import { useMutation, useLazyQuery } from "@apollo/react-hooks"
import { GET_LAST_TICKED_ITEM, UNTICK_ITEM } from "../api/listMutations"
import CircularProgress from "@material-ui/core/CircularProgress"

const UndoButton = () => {
  const [disableButton, setDisableButton] = useState(false)

  const [
    runLastTickedQuery,
    { called: calledLtq, loading: loadingLtq, error: errorLtq, data: dataLtq },
  ] = useLazyQuery(GET_LAST_TICKED_ITEM)

  const [untickItem, { called: calledUti, loading: loadingUti }] = useMutation(
    UNTICK_ITEM
  )

  // Enable button when not loading
  if (!loadingLtq && !loadingUti && disableButton) setDisableButton(false)
  // Disable button when loading
  if (!disableButton && (loadingLtq || loadingUti)) setDisableButton(true)

  // If we've had the result back for the query, and it's good, then issue the untick
  if (calledLtq && !loadingLtq && !errorLtq && !calledUti) {
    console.log(`Attempting untick`)
    if (dataLtq.shopping_list_item.length !== 0) {
      const itemId = dataLtq.shopping_list_item[0].item_id
      untickItem({
        variables: {
          itemId: itemId,
        },
      })
    }
  }

  if (loadingLtq || loadingUti) return <CircularProgress color="secondary" />

  console.log(`${calledLtq}, ${calledUti}`)

  return (
    <IconButton
      variant="outlined"
      color="secondary"
      disabled={disableButton}
      onClick={() => runLastTickedQuery()}
    >
      <UndoIcon />
    </IconButton>
  )
}

export default UndoButton
