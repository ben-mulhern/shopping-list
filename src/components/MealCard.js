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
import { useDispatch, useSelector } from "react-redux"
import { toggleMeal } from "../state/actions"
import clsx from "clsx"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { withRouter } from "react-router-dom"
import ConfirmDeleteWindow from "./ConfirmDeleteWindow"
import PersonIcon from "@material-ui/icons/Person"
import Badge from "@material-ui/core/Badge"
import Tooltip from "@material-ui/core/Tooltip"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import List from "@material-ui/core/List"
import DisplayIngredient from "./DisplayIngredient"
import {
  ADD_MEAL_TO_PLAN,
  REMOVE_MEAL_FROM_PLAN,
} from "../api/mealListApiOperations"
import { useMutation } from "@apollo/react-hooks"

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
  accordion: {
    backgroundColor: "transparent",
  },
})

const MealCard = (props) => {
  const classes = useStyles()
  const meal = props.meal
  const selectedMeals = useSelector((state) => state.selectedMeals)
  const [addMealToPlan] = useMutation(ADD_MEAL_TO_PLAN)
  const [removeMealFromPlan] = useMutation(REMOVE_MEAL_FROM_PLAN)
  const dispatch = useDispatch()

  const selected = selectedMeals.includes(meal.meal_id)
  const cardClass = clsx(
    classes.card,
    selected && classes.selected,
    props.hidden && classes.hidden
  )
  const [deleteWindowOpen, setDeleteWindowOpen] = useState(false)

  const triggerDeleteWindow = (e) => {
    e.stopPropagation()
    setDeleteWindowOpen(true)
  }

  const addOrRemoveMeal = () => {
    if (selected)
      removeMealFromPlan({
        variables: {
          meal_id: meal.meal_id,
        },
      })
    else {
      const planItems = meal.meal_ingredients.map((i) => ({
        meal_id: meal.meal_id,
        ingredient_id: i.ingredient.ingredient_id,
      }))
      addMealToPlan({
        variables: {
          meal: planItems,
        },
      })
    }
    dispatch(toggleMeal(meal.meal_id))
  }

  return (
    <Card raised={true} className={cardClass}>
      <CardActionArea onClick={() => addOrRemoveMeal()}>
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
      <Accordion elevation={0} className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
              onClick={(e) => triggerDeleteWindow(e)}
              disabled={selected}
            >
              Delete
            </Button>
            <Tooltip title={`Serves ${meal.serves}`}>
              <Badge badgeContent={meal.serves} color="primary">
                <PersonIcon color="secondary" />
              </Badge>
            </Tooltip>
          </CardActions>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {meal.meal_ingredients.map((mi) => {
              const checked =
                mi.meal_ingredient_plan_items.length > 0 &&
                mi.meal_ingredient_plan_items[0].checked
              const questionMark =
                mi.meal_ingredient_plan_items.length > 0 &&
                mi.meal_ingredient_plan_items[0].questionMark
              return (
                <DisplayIngredient
                  item={mi}
                  index={mi.ingredient.ingredient_id}
                  checkboxTooltipText="Check if required"
                  checked={checked}
                  questionMark={questionMark}
                  toggleItem={() => {}}
                  toggleQuestionMark={() => {}}
                  editAction={() => {}}
                  allowActions={selected}
                  questionMarkDisabled={!checked}
                />
              )
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <ConfirmDeleteWindow
        open={deleteWindowOpen}
        handleClose={() => setDeleteWindowOpen(false)}
        mealId={meal.meal_id}
        description={meal.description}
      />
    </Card>
  )
}

export default withRouter(MealCard)
