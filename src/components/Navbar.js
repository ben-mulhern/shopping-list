import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = (props) => {

  const LinkTab = (props) => (
    <Tab
      label={props.label}
      component={Link}
      to={props.href}
    />
  )

  return (
    <AppBar position="static">
      <Tabs value={props.activeTab}>
        <LinkTab label="Shopping list" href="/list" />
        <LinkTab label="Meals" href="/meals" />
        <LinkTab label="Ingredients" href="/ingredients" />
      </Tabs>
    </AppBar>
  )  
}

const mapStateToProps = state => {
  return {
    activeTab: state.activeTab
  }
}

export default connect(mapStateToProps)(Navbar)