import React from 'react'
import { connect } from 'react-redux'
import { setTab } from '../state/actions'
import { gql } from 'apollo-boost'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import MealDetailForm from './MealDetailForm'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from "@material-ui/core/styles"

const mealQuery = gql`
  query getMealById($meal_id: Int!) {
    meal(where: {meal_id: {_eq: $meal_id}}) {
      meal_id
      description
      diet_type
      leftovers
      image_url
      serves
      recipe_book
      meal_tags {
        tag
      }
      meal_ingredients {
        quantity
        unit {
          unit_id
        }
        ingredient {
          ingredient_id
          description
          store_location {
            store_location_id
          }
        }
      }
    }
  }  
`

const staticDataQuery = gql`
  query getStaticData {
    unit {
      unit_id
    }
    store_location {
      store_location_id
    }
    ingredient {
      ingredient_id
      description
      store_location {
        store_location_id
      }
    }    
  }  
`

const emptyMeal = {
  "meal_id": 0,
  "description": "",
  "diet_type": "OMNI",
  "leftovers": false,
  "image_url": "",
  "serves": 4,
  "recipe_book": "",
  "meal_tags": [],
  "meal_ingredients": []
}

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

const MealDetail = (props) => {

  props.setTab(1)
  const mealId = props.match.params.id
  const classes = useStyles()

  const { loading: staticLoading, error: staticError, data: staticData } = useQuery(staticDataQuery, 
    { fetchPolicy: 'no-cache'}) 

    const [runMealQuery, { called, loading, error, data }] = 
    useLazyQuery(mealQuery, 
                 { variables: { "meal_id": mealId },
                   fetchPolicy: 'no-cache'})  

  if (!called && mealId !== "new") runMealQuery()

  if (loading || staticLoading) return <CircularProgress color="secondary" className={classes.margin} />
  if (error || staticError) return <p>Error :(</p>

  const meal = (called ? data.meal[0] : emptyMeal)
  const units = staticData.unit
  const locations = staticData.store_location
  const ingredients = staticData.ingredient

  return <MealDetailForm meal={meal} units={units} 
            locations={locations} ingredients={ingredients} />

}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(MealDetail)