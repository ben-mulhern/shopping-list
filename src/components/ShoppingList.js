import React from 'react'
import { connect } from 'react-redux'
import { setTab } from '../state/actions'
import { useSubscription, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Immutable from 'immutable'
import ListItem from './ListItem'
import {QUERY_STATIC_DATA} from '../api/queries'

const listSubscription = gql`
  subscription {
    shopping_list_item (
      order_by: {ingredient: {store_location: {shop_order: asc}}}
    )  {
      item_id
      quantity
      unit {
        unit_id
      }
      ingredient {
        ingredient_id
        description
        store_location {
          store_location_id
          shop_order
        }
      }     
    }
  }
`

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

const ShoppingList = (props) => {

  const classes = useStyles()
  props.setTab(0)

  const {loading, error, data} = useSubscription(listSubscription)

  const { loading: staticLoading, error: staticError, data: staticData } = useQuery(QUERY_STATIC_DATA, 
    { fetchPolicy: 'no-cache'})   

  if (loading || staticLoading) return <CircularProgress color="secondary" className={classes.margin} />
  if (error || staticError) return <p>Error :(</p>

  const items = Immutable.List(data.shopping_list_item)

  const editListItem = () => {

  }

  return (
    <div>
    {items.map((li, i) => <ListItem listItem={li} 
      units={staticData.unit} locations={staticData.store_location}
      ingredients={staticData.ingredient} 
      key={i} rowIndex={i}
      editIngredient={editListItem} />)}
    </div>  
  )
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(ShoppingList)