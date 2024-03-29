export type DietType = "OMNI" | "VEGETARIAN" | "VEGAN"

export type StoreLocation = {
  store_location_id: string
  description: string
  shop_order: number
}

export type Unit = {
  unit_id: string
  description: string
}

export type Ingredient = {
  ingredient_id?: number
  description: string
  store_location: StoreLocation
}

export type MealIngredientPlanItem = {
  meal_id?: number
  ingredient_id?: number
  question_mark: boolean
  checked: boolean
  meal_ingredient: MealIngredient
}

export type MealIngredient = {
  ingredient: Ingredient
  quantity: number
  unit: Unit
  default_question_mark: boolean
  meal_ingredient_plan_item?: MealIngredientPlanItem
}

export type MealPlanCount = {
  meal_id: number
  meal_count: number
}

export type Meal = {
  meal_id: number
  description: string
  serves: number
  diet_type: DietType
  recipe_book?: string
  image_url?: string
  meal_ingredients: MealIngredient[]
  meal_plan_count?: MealPlanCount
}

export type ShoppingListItem = {
  item_id?: number
  quantity: number
  unit: Unit
  ingredient: Ingredient
  ticked_at?: Date
  question_mark: boolean
}

// Not ideal but kind of a mish-mash of MealIngredient and ShoppingListItem
// that allows them to share a UI component
export type EditableItem = {
  ingredient: Ingredient
  quantity: number
  unit: Unit
  default_question_mark?: boolean
  item_id?: number
  question_mark?: boolean
}
