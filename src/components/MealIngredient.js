import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  quantity: {
    width: 60
  },
  textField: {
    width: 200
  },
  zeroPadding: {
    padding: 0
  }
}))

const MealIngredient = props => {
  const mi = props.mealIngredient
  const classes = useStyles()

  return (
    <div>
      <FormControl
        className={clsx(classes.margin, classes.quantity)}
        variant="standard"
      >
        <Input
          required
          className={classes.zeroPadding}
          //value={mi.quantity}
          //onChange={handleChange('weight')}
          //endAdornment={<InputAdornment position="end">{unitPicker}</InputAdornment>}
          label="Quantity"
          type="number"
          placeholder="Qty"
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.quantity)}
        variant="standard"
      >
        <Select
          variant="standard"
          required
          label="Unit"
          //alue={age}
          //onChange={handleChange}
          //labelWidth={50}
        >
          <MenuItem value="kg">kg</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={clsx(classes.margin, classes.textField)}>
        <Autocomplete
          freeSolo
          options={["Ingredient 1", "Ingredient 2", "Ingredient 3"]}
          renderInput={params => (
            <TextField
              {...params}
              required
              //value={mi.ingredient.description}
              fullWidth
              variant="standard"
              //onChange={e => setDescription(e.target.value)}
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
          placeholder="Location"
          //alue={age}
          //onChange={handleChange}
          //labelWidth={50}
        >
          <MenuItem value="kg">kg</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  ) 
}

export default MealIngredient
