import React from 'react'
import { connect } from 'react-redux'
import { setTab } from '../state/actions'

const ShoppingList = (props) => {

  props.setTab(1)

  return (
    <div>
      <p>Meal detail goes here</p>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(ShoppingList)