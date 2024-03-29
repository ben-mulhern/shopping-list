//import Immutable from "immutable"
import { Meal } from "./shoppingListTypes"

// Does this meal match the search string?
const mealSearch = (searchString: string, meal: Meal) => {
  if (!searchString) return true

  return meal.description.toUpperCase().includes(searchString.toUpperCase())

  //   const wordSet = Immutable.Set(searchString.toUpperCase().split(" "))
  //   const hits = wordSet.map((w) => checkMealWord(meal, w))
  //   return !hits.includes(false)
  // }

  // // Search for any substring hits on a word for a meal
  // // Check a meal's name, tags and ingredients
  // const checkMealWord = (meal: Meal, word: string) => {
  //   const mealTags = Immutable.Set(meal.meal_tags.map((t) => t.tag.toUpperCase()))
  //   const mealIngredients = Immutable.Set(
  //     meal.meal_ingredients.map((i) => i.ingredient.description.toUpperCase())
  //   )
  //   const mealWords = mealTags
  //     .union(mealIngredients)
  //     .add(meal.description.toUpperCase())
  //   const hits = mealWords.filter((w) => w.includes(word))
  //   return hits.size > 0
}

export default mealSearch
