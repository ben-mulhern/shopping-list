import Immutable from 'immutable'

const initialState = {
  loggedIn: false,
  activeTab: 0,
  selectedMeals: Immutable.Set()
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {        

    case 'LOGIN':
      return {
        ...state,
        loggedIn: true
      }

    case 'SET_TAB':
      return {
        ...state,
        activeTab: action.tabIndex
      }  
      
      case 'TOGGLE_MEAL':
        const newMeals = ((state.selectedMeals.includes(action.mealId)) ?
                          state.selectedMeals.delete(action.mealId) :
                          state.selectedMeals.add(action.mealId))
        return {
          ...state,
          selectedMeals: newMeals       
        }  

    default:
      return state
  }
}

export default appReducer