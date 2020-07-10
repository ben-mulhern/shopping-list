import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Navbar = (props) => {
  const activeTab = useSelector((state) => state.activeTab)
  const LinkTab = (props) => (
    <Tab label={props.label} component={Link} to={props.href} />
  )

  return (
    <AppBar position="static">
      <Tabs value={activeTab}>
        <LinkTab label="Shopping list" href="/list" />
        <LinkTab label="Meals" href="/meals" />
      </Tabs>
    </AppBar>
  )
}

export default Navbar
