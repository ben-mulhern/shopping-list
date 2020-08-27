import {
  ShoppingListItem,
  MealIngredient,
  EditableItem,
} from "./shoppingListTypes"

export const shoppingListItemToEditableItemConverter = (
  shoppingList: ShoppingListItem
): EditableItem => ({
  item_id: shoppingList.item_id,
  ingredient: shoppingList.ingredient,
  quantity: shoppingList.quantity,
  unit: shoppingList.unit,
  question_mark: shoppingList.question_mark,
})

export const editableItemToShoppingListItemConverter = (
  ei: EditableItem
): ShoppingListItem => ({
  item_id: ei.item_id,
  quantity: ei.quantity,
  unit: ei.unit,
  ingredient: ei.ingredient,
  question_mark: ei.question_mark!,
})

export const editableItemToMealIngredientConverter = (
  ei: EditableItem
): MealIngredient => ({
  quantity: ei.quantity,
  unit: ei.unit,
  ingredient: ei.ingredient,
  default_question_mark: ei.default_question_mark!,
})

export const mealIngredientToEditableItemConverter = (
  mealIngredient: MealIngredient
): EditableItem => ({
  quantity: mealIngredient.quantity,
  unit: mealIngredient.unit,
  ingredient: mealIngredient.ingredient,
  default_question_mark: mealIngredient.default_question_mark,
})
