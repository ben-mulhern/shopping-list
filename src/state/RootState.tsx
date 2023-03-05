import Immutable from "immutable"
import { Unit, StoreLocation, Ingredient } from "../domain/shoppingListTypes"

export interface RootState {
  loggedIn: boolean
  activeTab: number
  lastTickedId: number
  planOnlyMode: boolean
  units: Immutable.List<Unit>
  locations: Immutable.List<StoreLocation>
  ingredients: Immutable.List<Ingredient>
  searchString: string
}

export const INITIAL_STATE = {
  loggedIn: false,
  activeTab: 0,
  lastTickedId: 0,
  planOnlyMode: false,
  units: Immutable.List(),
  locations: Immutable.List(),
  ingredients: Immutable.List(),
  searchString: "",
}
