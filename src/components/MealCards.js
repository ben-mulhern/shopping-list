import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import MealCard from './MealCard'
import { connect } from 'react-redux'
import { setTab } from '../state/actions'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}))

const mealQuery = gql`
  {
    meal {
      description,
      image_url,
      meal_tags {
        tag
      }
    }
  }
`

const MealCards = (props) => {
  const classes = useStyles()
  props.setTab(1)

  const { loading, error, data } = useQuery(mealQuery);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search meals"
          inputProps={{ 'aria-label': 'search meals' }}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div>
        {data.meal.map((m, i) => <MealCard meal={m} key={i} />)}  
      </div>
    </div>
  )  
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(MealCards)