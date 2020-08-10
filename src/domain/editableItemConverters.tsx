import { ShoppingListItem, MealIngredient } from "./shoppingListTypes"

export const shoppingListItemToMealIngredientConverter = (
  shoppingList: ShoppingListItem
): MealIngredient => ({
  ingredient: shoppingList.ingredient,
  quantity: shoppingList.quantity,
  unit: shoppingList.unit,
  default_question_mark: shoppingList.question_mark,
})

export const mealIngredientToShoppingListItemConverter = (
  mealIngredient: MealIngredient
): ShoppingListItem => ({
  quantity: mealIngredient.quantity,
  unit: mealIngredient.unit,
  ingredient: mealIngredient.ingredient,
  question_mark: mealIngredient.default_question_mark,
})
