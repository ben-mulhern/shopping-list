import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import { connect } from "react-redux"
import { toggleMeal } from "../state/actions"
import clsx from "clsx"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { withRouter } from "react-router-dom"
import ConfirmDeleteWindow from "./ConfirmDeleteWindow"
import PersonIcon from "@material-ui/icons/Person"
import Badge from "@material-ui/core/Badge"
import Tooltip from "@material-ui/core/Tooltip"

const useStyles = makeStyles({
  card: {
    width: 300,
    display: "inline-block",
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    verticalAlign: "top",
  },
  media: {
    height: 140,
  },
  chip: {
    margin: 1,
  },
  selected: {
    backgroundColor: "#999999",
    opacity: 0.6,
  },
  hidden: {
    display: "none",
  },
})

const MealCard = (props) => {
  const classes = useStyles()
  const meal = props.meal

  const selected = props.selectedMeals.includes(meal.meal_id)
  const cardClass = clsx(
    classes.card,
    selected && classes.selected,
    props.hidden && classes.hidden
  )
  const [deleteWindowOpen, setDeleteWindowOpen] = useState(false)

  return (
    <Card raised={true} className={cardClass}>
      <CardActionArea onClick={(e) => props.toggleMeal(meal.meal_id)}>
        <CardMedia
          className={classes.media}
          image={
            meal.image_url
              ? meal.image_url
              : process.env.PUBLIC_URL + "/meal-placeholder.png"
          }
          title={meal.description}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {meal.description}
          </Typography>
          {meal.meal_tags.map((t, i) => (
            <Chip label={t.tag} className={classes.chip} key={i} />
          ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color={selected ? "primary" : "secondary"}
          startIcon={<EditIcon />}
          onClick={() => props.history.push(`/meal/${meal.meal_id}`)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color={selected ? "primary" : "secondary"}
          startIcon={<DeleteIcon />}
          onClick={() => setDeleteWindowOpen(true)}
          disabled={selected}
        >
          Delete
        </Button>
        <Tooltip title={`Serves ${meal.serves}`}>
          <Badge badgeContent={meal.serves} color="primary">
            <PersonIcon color="secondary" />
          </Badge>
        </Tooltip>
        <ConfirmDeleteWindow
          open={deleteWindowOpen}
          handleClose={() => setDeleteWindowOpen(false)}
          mealId={meal.meal_id}
          description={meal.description}
        />
      </CardActions>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedMeals: state.selectedMeals,
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleMeal: (mealId) => dispatch(toggleMeal(mealId)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MealCard)
)
