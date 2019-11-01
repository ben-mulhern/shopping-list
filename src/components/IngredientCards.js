import React from 'react'
import { connect } from 'react-redux'
import { setTab } from '../state/actions'

const IngredientCards = (props) => {
  props.setTab(2)
  return (
    <div>
      <p>Ingredient cards go here</p>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTab: index => dispatch(setTab(index))
})

export default connect(null, mapDispatchToProps)(IngredientCards)