import React from "react"
import { connect } from "react-redux"
import { setTab } from "../state/actions"
import { useSubscription, useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import Immutable from "immutable"
import { QUERY_STATIC_DATA } from "../api/queries"
import IconButton from "@material-ui/core/IconButton"
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd"
import Avatar from "@material-ui/core/Avatar"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Checkbox from "@material-ui/core/Checkbox"
import Paper from "@material-ui/core/Paper"

const listSubscription = gql`
  subscription {
    shopping_list_item(
      order_by: { ingredient: { store_location: { shop_order: asc } } }
    ) {
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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  width300: {
    minWidth: 300,
    maxWidth: 600,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const ShoppingList = (props) => {
  const classes = useStyles()
  props.setTab(0)

  const { loading, error, data } = useSubscription(listSubscription)

  const {
    loading: staticLoading,
    error: staticError,
    data: staticData,
  } = useQuery(QUERY_STATIC_DATA, { fetchPolicy: "no-cache" })

  if (loading || staticLoading)
    return <CircularProgress color="secondary" className={classes.margin} />
  if (error || staticError) return <p>Error :(</p>

  const items = Immutable.List(data.shopping_list_item)

  return (
    <div>
      <Avatar className={classes.margin}>
        <IconButton variant="contained" color="secondary">
          <PlaylistAddIcon />
        </IconButton>
      </Avatar>
      <Paper className={classes.width300}>
        <List>
          {items.map((li, i) => (
            <ListItem dense button>
              <ListItemIcon>
                <Checkbox edge="start" tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={`${li.quantity}${li.unit.unit_id} ${li.ingredient.description}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setTab: (index) => dispatch(setTab(index)),
})

export default connect(null, mapDispatchToProps)(ShoppingList)
