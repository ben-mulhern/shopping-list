import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import MealCard from './MealCard'
import { connect } from 'react-redux'
import { setTab } from '../state/actions'

const mealQuery = gql`
  {
    meal {
      description,
      image_url,
      meal_tags {
        tag
      }
    }
  }
`

const MealCards = (props) => {

  props.setTab(1)

  const { loading, error, data } = useQuery(mealQuery);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {data.meal.map((m, i) => <MealCard meal={m} key={i} />)}  
    </div>
  )  
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(MealCards)