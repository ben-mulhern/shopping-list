import Immutable from "immutable"

// This takes all the current list items, plus the ingredients from the selected meals,
// and condenses them into a smaller list, grouping the same ingredients together,
// so long as they have the same unit of quantity
const shoppingListBuilder = (mealIngredients, listItems) => {
  const a = Immutable.List(mealIngredients).map((i) => ({
    id: i.ingredient.ingredient_id,
    unit: i.unit.unit_id,
    quantity: i.quantity,
    question_mark: false,
  }))
  const b = Immutable.List(listItems).map((i) => ({
    id: i.ingredient.ingredient_id,
    unit: i.unit.unit_id,
    quantity: i.quantity,
    question_mark: i.question_mark,
  }))
  const allItems = a.concat(b)
  const group = allItems.groupBy((i) => i.id + i.unit).valueSeq()
  const newList = group.map((vals) => ({
    ingredient_id: vals.first().id,
    unit_id: vals.first().unit,
    quantity: vals.reduce((sum, x) => sum + x.quantity, 0),
    question_mark: vals.reduce((res, x) => res || x.question_mark, false),
  }))

  return newList
}

export default shoppingListBuilder