import React from 'react'
import Immutable from 'immutable'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

  margin: {
    margin: theme.spacing(1)
  }
}))

const CREATE_MEAL = gql`
  mutation insert_meal($description: String!,
                       $serves: smallint!,
                       $leftovers: Boolean!,
                       $dietType: String,
                       $recipeBook: String,
                       $imageUrl: String) {
    insert_meal(
      objects: [
        {
          description: $description,
          serves: $serves,
          leftovers: $leftovers,
          diet_type: $dietType,
          recipe_book: $recipeBook,
          image_url: $imageUrl
        }
      ]
    ) {
      returning {
        meal_id
      }
    }
  }
`

const CommitChangesButton = (props) => {

  const classes = useStyles()
  const [createMeal, { loading: creating, error: ceateError }] = useMutation(CREATE_MEAL)

  const saveChanges = () => {
    
    const tags = Immutable.Set(props.tagString.split(' '))
    const tagObjs = tags.map(t => ({"tag": t})).toArray()
    console.log(tags)

    createMeal({
      variables: { 
        description: props.description,
        serves: props.serves,
        leftovers: props.leftovers,
        dietType: props.dietType,
        recipeBook: props.recipeBook,
        imageUrl: props.imageUrl,
        tags: tags
      }
    })

    // create new ingredients
    // If new
    //   insert meal record
    // if update
    //   update meal record
    //   delete ingredient x-refs
    //   delete tag records
    // insert ingredient x-refs  
    // insert tag records
    // Go to list screen (refetch?)
  }

  return <Button variant="contained" color="primary" className={classes.margin} 
            startIcon={<SaveIcon />}
            onClick={() => saveChanges()}>
           Save
         </Button>

}

export default CommitChangesButton