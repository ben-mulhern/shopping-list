import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  quantity: {
    width: 60
  },
  unit: {
    width: 70
  },
  textField: {
    width: 180
  },
  stripedRow: {
    backgroundColor: '#d3d3d3'
  }
}))

const MealIngredient = props => {
  const mi = props.mealIngredient
  const units = props.units
  const locations = props.locations
  const classes = useStyles()

  const [quantity, setQuantity] = useState(mi.quantity)
  const [unit, setUnit] = useState(mi.unit.unit_id)
  const [ingredient, setIngredient] = useState(mi.ingredient.description)
  const [location, setLocation] = useState(mi.ingredient.store_location.store_location_id)

  return (
    <div key={props.rowIndex} className={((props.rowIndex % 2 === 0) ? classes.stripedRow : "")}>
      <FormControl
        className={clsx(classes.margin, classes.quantity)}
        variant="standard"
      >
        <Input
          required
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          label="Quantity"
          type="number"
          placeholder="Qty"
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
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          {units.map(u => <MenuItem key={u.unit_id} value={u.unit_id}>{u.unit_id}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl className={clsx(classes.margin, classes.textField)}>
        <Autocomplete
          freeSolo
          options={props.ingredients.map(i => i.description)}
          value={ingredient}
          onChange={(e, v) => setIngredient(v)}
          renderInput={params => (
            <TextField
              {...params}
              required
              fullWidth
              variant="standard"
              placeholder="Ingredient"
            />
          )}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="standard"
      >
        <Select
          variant="standard"
          required
          label="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          {locations.map(l => <MenuItem key={l.store_location_id} value={l.store_location_id}>{l.store_location_id}</MenuItem>)}
        </Select>
      </FormControl>
      <DeleteIcon className={classes.margin} />
    </div>
  ) 
}

export default MealIngredient
