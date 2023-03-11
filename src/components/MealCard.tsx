import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import clsx from "clsx"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { RouteComponentProps, withRouter } from "react-router-dom"
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
  SET_PLAN_QUESTION_MARK,
  UNSET_PLAN_QUESTION_MARK,
  CHECK_PLAN_ITEM,
  UNCHECK_PLAN_ITEM,
  UPDATE_MEAL_PLAN_COUNT,
} from "../api/mealListApiOperations"
import { useMutation } from "@apollo/react-hooks"
import Box from "@material-ui/core/Box"
import Slider from "@material-ui/core/Slider"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { useSelector } from "react-redux"
import IconButton from "@material-ui/core/IconButton"
import { RootState } from "../state/RootState"
import { Meal } from "../domain/shoppingListTypes"

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
  hidden: {
    display: "none",
  },
  accordion: {
    backgroundColor: "transparent",
  },
  slider: {
    margin: 1,
    width: "100%",
  },
})

interface Props extends RouteComponentProps {
  meal: Meal
  selected: boolean
}

const MealCard = (props: Props) => {
  const classes = useStyles()
  const meal = props.meal
  const [addMealToPlan] = useMutation(ADD_MEAL_TO_PLAN)
  const [removeMealFromPlan] = useMutation(REMOVE_MEAL_FROM_PLAN)
  const [setPlanQuestionMark] = useMutation(SET_PLAN_QUESTION_MARK)
  const [unsetPlanQuestionMark] = useMutation(UNSET_PLAN_QUESTION_MARK)
  const [checkPlanItem] = useMutation(CHECK_PLAN_ITEM)
  const [uncheckPlanItem] = useMutation(UNCHECK_PLAN_ITEM)
  const [updateMealPlanCount] = useMutation(UPDATE_MEAL_PLAN_COUNT)
  const selected = props.selected
  const planOnly = useSelector((state: RootState) => state.planOnlyMode)
  const hidden = planOnly && !selected

  const cardClass = clsx(classes.card, hidden && classes.hidden)
  const sliderClass = clsx(classes.slider, !selected && classes.hidden)
  const [deleteWindowOpen, setDeleteWindowOpen] = useState(false)
  const mealCount = meal.meal_plan_count?.meal_count ?? 1
  const marks = Array(6)
    .fill({})
    .map((e, i) => ({ value: (i + 1) / 2, label: ((i + 1) / 2).toString() }))

  const toggleItem = (
    mealId: number,
    ingredientId: number,
    checked: boolean
  ) => {
    const variables = {
      variables: { meal_id: mealId, ingredient_id: ingredientId },
    }
    if (checked) checkPlanItem(variables)
    else uncheckPlanItem(variables)
  }

  const toggleQuestionMark = (
    mealId: number,
    ingredientId: number,
    checked: boolean
  ) => {
    const variables = {
      variables: { meal_id: mealId, ingredient_id: ingredientId },
    }
    if (checked) setPlanQuestionMark(variables)
    else unsetPlanQuestionMark(variables)
  }

  const triggerDeleteWindow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
        question_mark: i.default_question_mark,
      }))
      addMealToPlan({
        variables: {
          meal: planItems,
          mealId: meal.meal_id,
        },
      })
    }
  }

  const [cardElevation, setCardElevation] = useState(1)
  const [expanded, setExpanded] = useState(false)

  if (planOnly && selected && !expanded) setExpanded(true)

  return (
    <Card
      raised={true}
      className={cardClass}
      elevation={cardElevation}
      onMouseEnter={() => setCardElevation(15)}
      onMouseLeave={() => setCardElevation(1)}
    >
      <Box
        border={selected ? 5 : 0}
        borderColor={selected ? "secondary.main" : "default"}
        borderRadius={8}
      >
        <CardActionArea onClick={() => addOrRemoveMeal()}>
          <CardMedia
            className={classes.media}
            component="img"
            image={
              meal.image_url
                ? meal.image_url
                : process.env.PUBLIC_URL + "/meal-placeholder.png"
            }
            title={meal.description}
            loading="lazy"
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {meal.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
      <Accordion
        elevation={0}
        className={classes.accordion}
        expanded={expanded}
      >
        <AccordionSummary
          expandIcon={
            <Tooltip title={expanded ? "Hide ingredients" : "View ingredients"}>
              <span>
                <IconButton
                  onClick={() => setExpanded(!expanded)}
                  disabled={planOnly}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </span>
            </Tooltip>
          }
        >
          <CardActions>
            <Button
              size="small"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => props.history.push(`/meal/${meal.meal_id}`)}
              disabled={selected}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="secondary"
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
          <div>
            <FormControl className={sliderClass}>
              <FormLabel component="legend">{`Meal count (${
                meal.serves * mealCount
              } portions)`}</FormLabel>
              <Slider
                step={0.5}
                marks={marks}
                min={0.5}
                max={3}
                value={mealCount}
                valueLabelDisplay="auto"
                color="secondary"
                onChange={(e, v) =>
                  updateMealPlanCount({
                    variables: {
                      meal_id: meal.meal_id,
                      count: v,
                    },
                  })
                }
              />
            </FormControl>
            <List>
              {meal.meal_ingredients.map((mi) => {
                const checked = mi.meal_ingredient_plan_item?.checked ?? false
                const questionMark =
                  mi.meal_ingredient_plan_item?.question_mark ?? false
                return (
                  <DisplayIngredient
                    item={{
                      ...mi,
                      quantity: mi.quantity * mealCount,
                      item_id: 0,
                      question_mark: false,
                    }}
                    index={mi.ingredient.ingredient_id!}
                    key={mi.ingredient.ingredient_id}
                    checkboxTooltipText="Check if required"
                    checked={checked}
                    questionMark={questionMark}
                    toggleItem={() =>
                      toggleItem(
                        meal.meal_id,
                        mi.ingredient.ingredient_id!,
                        !checked
                      )
                    }
                    toggleQuestionMark={() =>
                      toggleQuestionMark(
                        meal.meal_id,
                        mi.ingredient.ingredient_id!,
                        !questionMark
                      )
                    }
                    editAction={() => {}}
                    allowActions={selected}
                    questionMarkDisabled={!checked}
                  />
                )
              })}
            </List>
          </div>
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
