import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {Link} from 'react-router-dom'

const Navbar = () => {

  const [value, setValue] = React.useState(0)
 
  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const LinkTab = (props) => (
    <Tab
      label={props.label}
      component={Link}
      to={props.href}
      onClick={e => handleChange(props.value)}
    />
  )

  return (
    <AppBar position="static">
      <Tabs value={value}>
        <LinkTab label="Shopping list" href="/list" />
        <LinkTab label="Meals" href="/meals" />
        <LinkTab label="Ingredients" href="/ingredients" />
      </Tabs>
    </AppBar>
  )  
}

export default Navbar