import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logOut } from "../state/actions"

const Navbar = (props) => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.activeTab)
  const loggedIn = useSelector((state) => state.loggedIn)
  const LinkTab = (props) => (
    <Tab
      label={props.label}
      component={Link}
      to={props.href}
      disabled={!loggedIn}
    />
  )

  const triggerLogOut = () => {
    localStorage.removeItem("API_KEY")
    dispatch(logOut())
  }

  return (
    <AppBar position="static">
      <Tabs value={activeTab}>
        <LinkTab label="Shopping list" href="/list" />
        <LinkTab label="Meals" href="/meals" />
        <Tab
          label="Logout"
          component={Link}
          disabled={!loggedIn}
          to="/login"
          onClick={triggerLogOut}
        />
      </Tabs>
    </AppBar>
  )
}

export default Navbar
