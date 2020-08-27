import React from "react"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import { useDispatch, useSelector } from "react-redux"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from "@material-ui/core/styles"
import { RootState } from "../state/RootState"
import { setSearchString } from "../state/actions"

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
  const searchString = useSelector((state: RootState) => state.searchString)
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search meals"
        value={searchString}
        onChange={(e) => dispatch(setSearchString(e.target.value))}
      />
      <IconButton className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Searchbox
