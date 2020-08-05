export type DietType = "OMNI" | "VEGETARIAN" | "VEGN"

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
  ingredient_id: number
  description: string
  store_location: StoreLocation
}

export type MealIngredient = {
  ingredient: Ingredient
  quantity: number
  unit: Unit
  default_question_mark: boolean
}

export type Meal = {
  meal_id: number
  description: string
  serves: number
  diet_type: DietType
  recipe_book?: string
  image_url?: string
  meal_ingredients: MealIngredient[]
  meal_tags: string[]
}

export type ShoppingListItem = {
  item_id: number
  quantity: number
  unit: Unit
  ingredient: Ingredient
  ticked_at?: Date
  question_mark: boolean
}
