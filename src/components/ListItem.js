import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import Checkbox from "@material-ui/core/Checkbox"
import cloneDeep from "lodash.clonedeep"
import Paper from "@material-ui/core/Paper"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

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
    maxWidth: 600,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  hidden: {
    display: "none",
  },
  visible: {
    display: "inline-block",
  },
}))

const emptyIngredient = {
  description: "",
  store_location: {
    store_location_id: "",
    description: "",
  },
}

const ListItem = (props) => {
  const li = props.listItem
  let item = cloneDeep(li)
  const units = props.units
  const locations = props.locations
  const classes = useStyles()
  const [ingredients, setIngredients] = useState(props.ingredients)
  const [checked, setChecked] = React.useState(false)

  const handleCheckbox = (event) => setChecked(event.target.checked)

  const ingredientFilter = (str, ings) => {
    if (!str) return ings
    else
      return ings.filter((i) =>
        i.description.toUpperCase().includes(str.toUpperCase())
      )
  }

  const handleQuantity = (qty) => {
    item.quantity = qty
    props.editIngredient(props.rowIndex, item)
  }

  const handleUnit = (unit) => {
    const newUnit = units.find((u) => u.unit_id === unit)
    item.unit = newUnit
    props.editIngredient(props.rowIndex, item)
  }

  const handleIngredient = (desc) => {
    let newIngredient = ingredients.find((i) => i.description === desc)
    if (!newIngredient) {
      newIngredient = cloneDeep(emptyIngredient)
      newIngredient.description = desc
      newIngredient.store_location = li.ingredient.store_location
    }
    item.ingredient = newIngredient
    setIngredients(ingredientFilter(desc, props.ingredients))
    props.editIngredient(props.rowIndex, item)
  }

  const handleLocation = (loc) => {
    const newLocation = locations.find((l) => l.store_location_id === loc)
    item.ingredient.store_location = newLocation
    props.editIngredient(props.rowIndex, item)
  }

  return (
    <Paper className={classes.width300}>
      <Checkbox
        className={props.trashCan ? classes.hidden : classes.visible}
        checked={checked}
        onChange={handleCheckbox}
      />
      <FormControl
        className={clsx(classes.margin, classes.quantity)}
        variant="standard"
      >
        <Input
          required
          value={li.quantity}
          onChange={(e) => handleQuantity(e.target.value)}
          label="Quantity"
          type="number"
          placeholder="Qty"
          error={li.quantity <= 0}
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
          value={li.unit.unit_id}
          onChange={(e) => handleUnit(e.target.value)}
        >
          {units.map((u) => (
            <MenuItem key={u.unit_id} value={u.unit_id}>
              {u.unit_id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={clsx(classes.margin, classes.textField200)}>
        <Autocomplete
          freeSolo
          options={ingredients.map((i) => i.description)}
          value={li.ingredient.description}
          onInputChange={(e, v) => handleIngredient(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder="Ingredient"
              required
            />
          )}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField130)}
        variant="standard"
      >
        <Select
          variant="standard"
          required
          label="Location"
          value={li.ingredient.store_location.store_location_id}
          onChange={(e) => handleLocation(e.target.value)}
        >
          {locations.map((l) => (
            <MenuItem key={l.store_location_id} value={l.store_location_id}>
              {l.store_location_id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        key="close"
        color="inherit"
        onClick={props.deleteIngredient}
        className={props.trashCan ? classes.visisble : classes.hidden}
      >
        <DeleteIcon className={classes.margin} />
      </IconButton>
    </Paper>
  )
}

export default ListItem
