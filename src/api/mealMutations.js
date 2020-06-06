import { gql } from "apollo-boost"

export const UPSERT_INGREDIENTS = gql`
  mutation upsert_ingredients($ingredients: [ingredient_insert_input!]!) {
    insert_ingredient(
      objects: $ingredients
      on_conflict: {
        constraint: pk_ingredient
        update_columns: [description, store_location_id]
      }
    ) {
      returning {
        ingredient_id
        description
      }
    }
  }
`

export const UPSERT_MEAL = gql`
  mutation insert_meal($meal: meal_insert_input!) {
    insert_meal(
      objects: [$meal]
      on_conflict: {
        constraint: pk_meal
        update_columns: [
          description
          serves
          leftovers
          diet_type
          recipe_book
          image_url
        ]
      }
    ) {
      returning {
        meal_id
      }
    }
  }
`

export const SET_INGREDIENTS_AND_TAGS = gql`
  mutation set_meal_children(
    $mealId: Int!
    $mealIngredients: [meal_ingredient_insert_input!]!
    $tags: [meal_tag_insert_input!]!
  ) {
    delete_meal_ingredient(where: { meal_id: { _eq: $mealId } }) {
      affected_rows
    }
    insert_meal_ingredient(objects: $mealIngredients) {
      returning {
        ingredient_id
      }
    }
    delete_meal_tag(where: { meal_id: { _eq: $mealId } }) {
      affected_rows
    }
    insert_meal_tag(objects: $tags) {
      returning {
        tag
      }
    }
  }
`
