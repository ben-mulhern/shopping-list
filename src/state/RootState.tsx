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
}
