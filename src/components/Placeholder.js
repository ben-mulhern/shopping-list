import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

const mealQuery = gql`
  {
    meal {
      description
    }
  }
`
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 300,
    display: 'inline-block',
    margin: 10,
    padding: 10
  }
})

const Placeholder = () => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(mealQuery);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Shopping list" />
        <Tab label="Meals" />
        <Tab label="Ingredients" />
      </Tabs>
    </AppBar>
    <span>
      {data.meal.map(m => 
        <Card raised="true" className={classes.card}>
          <CardContent>{m.description}</CardContent>
        </Card>)}
    </span>  
  </div>
   
  )  
}

export default Placeholder