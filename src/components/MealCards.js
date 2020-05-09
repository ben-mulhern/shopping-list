import React, { useState } from "react"
import { useSubscription } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import MealCard from "./MealCard"
import { connect } from "react-redux"
import { setTab } from "../state/actions"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import Button from "@material-ui/core/Button"
import mealSearch from "../domain/mealSearch"
import AddIcon from "@material-ui/icons/Add"
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd"
import { withRouter } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import Immutable from "immutable"

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
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const mealSubscription = gql`
  subscription {
    meal {
      meal_id
      description
      image_url
      meal_tags {
        tag
      }
      meal_ingredients {
        ingredient {
          description
        }
      }
    }
  }
`

const MealCards = (props) => {
  const classes = useStyles()
  props.setTab(1)

  const { loading, error, data } = useSubscription(mealSubscription)

  const [searchString, setSearchString] = useState("")

  if (loading)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (error) return <p>Error :(</p>

  const meals = Immutable.List(data.meal)

  return (
    <div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search meals"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <IconButton className={classes.iconButton}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => props.history.push("/meal/new")}
      >
        New meal
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={props.selectedMeals.size === 0}
        startIcon={<PlaylistAddIcon />}
      >
        Add meals to list
      </Button>
      <div>
        {meals.map((m) => (
          <MealCard
            meal={m}
            key={m.meal_id}
            hidden={!mealSearch(searchString, m)}
          />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedMeals: state.selectedMeals,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTab: (index) => dispatch(setTab(index)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MealCards)
)
