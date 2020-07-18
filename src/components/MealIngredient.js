import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import cloneDeep from "lodash.clonedeep"
import Paper from "@material-ui/core/Paper"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import ClearIcon from "@material-ui/icons/Clear"
import Tooltip from "@material-ui/core/Tooltip"
import HelpIcon from "@material-ui/icons/Help"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  quantity: {
    width: 60,
  },
  unit: {
    width: 70,
  },
  textField200: {
    width: 200,
  },
  textField130: {
    width: 130,
  },
  width300: {
    minWidth: 300,
    maxWidth: 700,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const EMPTY_INGREDIENT = {
  description: "",
  store_location: {
    store_location_id: "",
    description: "",
  },
}

const MealIngredient = (props) => {
  const mi = props.mealIngredient
  let ing = cloneDeep(mi)
  const units = props.units
  const locations = props.locations
  const classes = useStyles()
  const [ingredients, setIngredients] = useState(props.ingredients)

  const ingredientFilter = (str, ings) => {
    if (!str) return ings
    else
      return ings.filter((i) =>
        i.description.toUpperCase().includes(str.toUpperCase())
      )
  }

  const handleQuantity = (qty) => {
    ing.quantity = qty
    props.editIngredient(props.rowIndex, ing)
  }

  const handleQuestionMark = () => {
    ing.default_question_mark = !mi.default_question_mark
    props.editIngredient(props.rowIndex, ing)
  }

  const handleUnit = (unit) => {
    const newUnit = units.find((u) => u.unit_id === unit)
    ing.unit = newUnit
    props.editIngredient(props.rowIndex, ing)
  }

  const handleIngredient = (desc) => {
    let newIngredient = ingredients.find((i) => i.description === desc)
    if (!newIngredient) {
      newIngredient = cloneDeep(EMPTY_INGREDIENT)
      newIngredient.description = desc
      newIngredient.store_location = mi.ingredient.store_location
    }
    ing.ingredient = newIngredient
    setIngredients(ingredientFilter(desc, props.ingredients))
    props.editIngredient(props.rowIndex, ing)
  }

  const handleLocation = (loc) => {
    const newLocation = locations.find((l) => l.store_location_id === loc)
    ing.ingredient.store_location = newLocation
    props.editIngredient(props.rowIndex, ing)
  }

  return (
    <Paper className={classes.width300}>
      <FormControl className={clsx(classes.margin, classes.textField200)}>
        <Autocomplete
          freeSolo
          options={ingredients.map((i) => i.description)}
          value={mi.ingredient.description}
          onInputChange={(e, v) => handleIngredient(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              autoFocus={props.listMode || !mi.ingredient.description}
              placeholder="Ingredient"
              required
            />
          )}
        />
      </FormControl>

      <FormControl
        className={clsx(classes.margin, classes.quantity)}
        variant="standard"
      >
        <Input
          required
          value={mi.quantity}
          onChange={(e) => handleQuantity(e.target.value)}
          label="Quantity"
          type="number"
          placeholder="Qty"
          error={mi.quantity <= 0}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.unit)}
        variant="standard"
      >
        <Select
          variant="standard"
          required
          label="Unit"
          value={mi.unit.unit_id}
          onChange={(e) => handleUnit(e.target.value)}
        >
          {units.map((u) => (
            <MenuItem key={u.unit_id} value={u.unit_id}>
              {u.unit_id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        className={clsx(classes.margin, classes.textField130)}
        variant="standard"
      >
        <Select
          variant="standard"
          required
          label="Location"
          value={mi.ingredient.store_location.store_location_id}
          onChange={(e) => handleLocation(e.target.value)}
        >
          {locations.map((l) => (
            <MenuItem key={l.store_location_id} value={l.store_location_id}>
              {l.store_location_id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {props.listMode ? (
        <span>
          <Tooltip title="Add ingredient to list">
            <IconButton
              color="primary"
              onClick={props.setItem}
              disabled={!mi.ingredient.description}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel changes">
            <IconButton color="inherit" onClick={props.deleteIngredient}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </span>
      ) : (
        <span>
          <Tooltip
            title={
              mi.default_question_mark
                ? "Mark as probably needed"
                : "Mark as always check"
            }
          >
            <IconButton onClick={() => handleQuestionMark()}>
              {mi.default_question_mark ? (
                <HelpIcon color="secondary" />
              ) : (
                <HelpOutlineIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove ingredient from meal">
            <IconButton color="inherit" onClick={props.deleteIngredient}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </span>
      )}
    </Paper>
  )
}

export default MealIngredient
