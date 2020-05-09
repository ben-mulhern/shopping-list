import React from "react"
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
import { connect } from "react-redux"
import { setTab, logIn } from "../state/actions"
import { useLazyQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import CircularProgress from "@material-ui/core/CircularProgress"
import reStartWsLink from "../api/apiClient"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: 250,
  },
}))

const loginQuery = gql`
  {
    unit {
      unit_id
    }
  }
`

const Login = (props) => {
  const [attemptLogInCall, { called, loading, error }] = useLazyQuery(
    loginQuery
  )

  const attemptLogin = (apiKey) => {
    console.log("Attempting login")
    sessionStorage.setItem("API_KEY", apiKey)
    reStartWsLink()
    attemptLogInCall()
  }

  props.setTab(0)

  const classes = useStyles()
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  if (called && loading)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (called && error) {
    sessionStorage.removeItem("API_KEY")
    return (
      <p>
        Login failed :( Please <a href="/">try again</a>
      </p>
    )
  }
  // If we got here and we've already called, we're logged in
  if (called) {
    props.logIn()
  }

  return (
    <div>
      <p>
        Welcome to Bolly's shopping list. Please enter the password to continue.
      </p>
      <form onSubmit={() => attemptLogin(values.password)}>
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
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
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

const mapDispatchToProps = (dispatch) => ({
  setTab: (index) => dispatch(setTab(index)),
  logIn: () => dispatch(logIn()),
})

export default connect(null, mapDispatchToProps)(Login)
