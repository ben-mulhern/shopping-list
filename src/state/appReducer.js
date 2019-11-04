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
      
    case 'SELECT_MEAL':
        return {
          ...state,
          selectedMeals: state.selectedMeals.add(action.mealKey)
        }   

    case 'DESELECT_MEAL':
        return {
          ...state,
          selectedMeals: state.selectedMeals.delete(action.mealKey)          
        }            
            
    default:
      return state
  }
}

export default appReducer