import React, { useState } from 'react'
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
import Button from '@material-ui/core/Button'

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
  },
  button: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10

  }
}))

const mealQuery = gql`
  {
    meal {
      meal_id,
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

  const { loading, error, data } = useQuery(mealQuery)

  const [searchTerms, setSearchTerms] = useState({
    fullString: '',
    terms: []
  })  

  const handleSearchBarChange = (newSearchString) => {
    const newTerms = {
      fullString: newSearchString,
      terms: newSearchString.split(' ')
    }
    setSearchTerms(newTerms)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search meals"
          inputProps={{ 'aria-label': 'search meals' }}
          value={searchTerms.fullString}
          onChange = {(e) => handleSearchBarChange(e.target.value)}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button variant="contained" color="primary" className={classes.button}>
        New meal
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Add meals to list
      </Button>
      <div>
        {data.meal.map(m => <MealCard meal={m} key={m.meal_id} />)}  
      </div>
    </div>
  )  
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(MealCards)