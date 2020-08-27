import React, { useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import InputAdornment from "@material-ui/core/InputAdornment"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import clsx from "clsx"
import Button from "@material-ui/core/Button"
import { useDispatch } from "react-redux"
import { setTab, logIn } from "../state/actions"
import { useLazyQuery } from "@apollo/react-hooks"
import CircularProgress from "@material-ui/core/CircularProgress"
import reStartWsLink from "../api/reStartWsLink"
import { LOGIN_TEST } from "../api/staticDataApiOperations"
import Tooltip from "@material-ui/core/Tooltip"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: 250,
  },
}))

const Login = () => {
  const dispatch = useDispatch()
  const [attemptLogInCall, { called, loading, error }] = useLazyQuery(
    LOGIN_TEST
  )

  const attemptLogin = (apiKey: string) => {
    localStorage.setItem("API_KEY", apiKey)
    reStartWsLink()
    attemptLogInCall()
  }

  dispatch(setTab(0))

  const classes = useStyles()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  if (called && loading)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (called && error) {
    localStorage.removeItem("API_KEY")
    return (
      <p>
        Login failed :( Please <a href="/">try again</a>
      </p>
    )
  }
  // If we got here and we've already called, we're logged in
  if (called) {
    dispatch(logIn())
  }

  return (
    <div>
      <p>
        Welcome to Bolly's shopping list. Please enter the password to continue.
      </p>
      <form onSubmit={() => attemptLogin(password)}>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            className={classes.margin}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Show password">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            type="submit"
          >
            Login
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default Login
