import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import { connect } from 'react-redux'
import { selectMeal, deselectMeal } from '../state/actions'
import clsx from 'clsx'

const useStyles = makeStyles({
  card: {
    width: 300,
    display: 'inline-block',
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    verticalAlign: 'top'
  },
  media: {
    height: 140
  },
  chip: {
    margin: 1
  },
  icon: {
    fontSize: 30
  },
  selected: {
    backgroundColor: '#d3d3d3',
    opacity: 0.6
  }
})

const MealCard = (props) => {
  const classes = useStyles()
  const meal = props.meal

  const selected = props.selectedMeals.includes(meal.meal_id)
  const cardClass = (selected ? clsx(classes.card, classes.selected) : classes.card)

  const button = (selected ? 
    <Button size="small" color="primary" onClick={e => props.deselectMeal(meal.meal_id)}>
      <RemoveCircleIcon className={classes.icon} color="primary" /> 
      Deselect
    </Button>

  : <Button size="small" color="secondary" onClick={e => props.selectMeal(meal.meal_id)}>
      <AddCircleIcon className={classes.icon} color="secondary" /> 
      Select
    </Button>
  )

  return (
    <Card raised={true} className={cardClass}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={meal.image_url ? meal.image_url : process.env.PUBLIC_URL + '/meal-placeholder.png'}
          title={meal.description}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {meal.description}
          </Typography>
          {meal.meal_tags.map(t => <Chip label={t.tag} className={classes.chip} />)}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {button}
      </CardActions>
    </Card>
  )  
}

const mapStateToProps = state => {
  return {
    selectedMeals: state.selectedMeals
  }
}

const mapDispatchToProps = dispatch => ({
  selectMeal: mealId => dispatch(selectMeal(mealId)),
  deselectMeal: mealId => dispatch(deselectMeal(mealId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MealCard)