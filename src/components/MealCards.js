import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import MealCard from './MealCard'

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

const MealCards = () => {
  const { loading, error, data } = useQuery(mealQuery);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {data.meal.map(m => <MealCard meal={m} />)}  
    </div>
  )  
}

export default MealCards