import React, { useState } from "react"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import { useDispatch, useSelector } from "react-redux"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from "@material-ui/core/styles"
import { setSearchString } from "../state/actions"
import { RootState } from "../state/RootState"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))

const Searchbox = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [localSearchString, setLocalSearchString] = useState("")
  const planOnly = useSelector((state: RootState) => state.planOnlyMode)
  const searchString = useSelector((state: RootState) => state.searchString)

  return (
    <div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search meals"
          value={localSearchString}
          type="search"
          onChange={(e) => {
            setLocalSearchString(e.target.value)
          }}
        />
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            console.log("Clicked the search button")
            dispatch(setSearchString(localSearchString))
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {!(searchString || planOnly) && <p>Showing first 20 meals only</p>}
    </div>
  )
}

export default Searchbox
