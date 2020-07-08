import Immutable from "immutable"

const initialState = {
  loggedIn: false,
  activeTab: 0,
  selectedMeals: Immutable.Set(),
  lastTickedId: 0,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
      }

    case "SET_TAB":
      return {
        ...state,
        activeTab: action.tabIndex,
      }

    case "TOGGLE_MEAL":
      const newMeals = state.selectedMeals.includes(action.mealId)
        ? state.selectedMeals.delete(action.mealId)
        : state.selectedMeals.add(action.mealId)
      return {
        ...state,
        selectedMeals: newMeals,
      }

    case "CLEAR_SELECTED_MEALS":
      const noMeals = Immutable.Set()
      return {
        ...state,
        selectedMeals: noMeals,
      }

    case "SET_LAST_TICKED_ITEM":
      return {
        ...state,
        lastTickedId: action.id,
      }

    default:
      return state
  }
}

export default appReducer
