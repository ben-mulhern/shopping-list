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
import { useSelector } from "react-redux"
import { EditableItem, Ingredient } from "../domain/shoppingListTypes"
import { RootState } from "../state/RootState"
import Immutable from "immutable"

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
    shop_order: 0,
  },
}

interface Props {
  mealIngredient: EditableItem
  key: number
  index: number
  editItem(key: number, ingredient: EditableItem): any
  listMode: boolean
  setItem?(): any
  deleteIngredient(): any
}

const EditableMealIngredient = (props: Props) => {
  const ei = props.mealIngredient
  let ing = cloneDeep(ei)
  const units = useSelector((state: RootState) => state.units)
  const locations = useSelector((state: RootState) => state.locations)
  const ings = useSelector((state: RootState) => state.ingredients)
  const classes = useStyles()
  const [ingredients, setIngredients] = useState(ings)

  const ingredientFilter = (str: string, ings: Immutable.List<Ingredient>) => {
    if (!str) return ings
    else
      return ings.filter((i) =>
        i.description.toUpperCase().includes(str.toUpperCase())
      )
  }

  const handleQuantity = (qty: number) => {
    ing.quantity = qty
    props.editItem(props.index, ing)
  }

  const handleQuestionMark = () => {
    ing.default_question_mark = !ei.default_question_mark
    props.editItem(props.index, ing)
  }

  const handleUnit = (unit: string) => {
    const newUnit = units.find((u) => u.unit_id === unit)
    ing.unit = newUnit!
    props.editItem(props.index, ing)
  }

  const handleIngredient = (desc: string) => {
    let newIngredient = ings.find((i) => i.description === desc)
    if (!newIngredient) {
      newIngredient = cloneDeep(EMPTY_INGREDIENT)
      newIngredient.description = desc
      newIngredient.store_location = ei.ingredient.store_location
    }
    if (ei.ingredient.ingredient_id === newIngredient.ingredient_id) {
      newIngredient.store_location = ei.ingredient.store_location
    }
    ing.ingredient = newIngredient
    setIngredients(ingredientFilter(desc, ings))
    props.editItem(props.index, ing)
  }

  const handleLocation = (loc: string) => {
    const newLocation = locations.find((l) => l.store_location_id === loc)
    ing.ingredient.store_location = newLocation!
    props.editItem(props.index, ing)
  }

  return (
    <Paper className={classes.width300}>
      <FormControl className={clsx(classes.margin, classes.textField200)}>
        <Autocomplete
          freeSolo
          options={ingredients.map((i) => i.description).toArray()}
          value={ei.ingredient.description}
          onInputChange={(e, v) => handleIngredient(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              autoFocus={props.listMode || !ei.ingredient.description}
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
          value={ei.quantity}
          onChange={(e) => {
            const qty: number = +e.target.value
            handleQuantity(qty)
          }}
          type="number"
          placeholder="Qty"
          error={ei.quantity <= 0}
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
          value={ei.unit.unit_id}
          onChange={(e) => handleUnit(e.target.value as string)}
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
          value={ei.ingredient.store_location.store_location_id}
          onChange={(e) => handleLocation(e.target.value as string)}
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
            <span>
              <IconButton
                color="primary"
                onClick={props.setItem}
                disabled={!ei.ingredient.description}
              >
                <AddCircleIcon />
              </IconButton>
            </span>
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
              ei.default_question_mark
                ? "Mark as probably needed"
                : "Mark as always check"
            }
          >
            <IconButton onClick={() => handleQuestionMark()}>
              {ei.default_question_mark ? (
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

export default EditableMealIngredient
