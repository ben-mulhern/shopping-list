import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const mealQuery = gql`
  {
    meal {
      description
    }
  }
`

// const Placeholder = () => (
//   <div>
//     <h1>Shopping List</h1>
//     <p>Here's a shopping list app</p>
//   </div>
// )

const Placeholder = () => {
  const { loading, error, data } = useQuery(mealQuery);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.meal.map(m => <p>{m.description}</p>)
}

export default Placeholder