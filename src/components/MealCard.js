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
  }
})

const MealCard = (props) => {
  const classes = useStyles()
  const meal = props.meal
  return (
    <Card raised={true} className={classes.card}>
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
        <Button size="small" color="primary">
          Add to list
        </Button>
      </CardActions>
    </Card>
  )  
}

export default MealCard