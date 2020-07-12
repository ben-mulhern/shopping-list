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

export const DELETE_MEAL = gql`
  mutation delete_meal($meal_id: Int!) {
    delete_meal(where: { meal_id: { _eq: $meal_id } }) {
      affected_rows
    }
  }
`

export const MEAL_SUBSCRIPTION = gql`
  subscription {
    meal {
      meal_id
      description
      image_url
      serves
      meal_tags {
        tag
      }
      meal_ingredients {
        ingredient {
          ingredient_id
          description
        }
        unit {
          unit_id
        }
        quantity
        meal_ingredient_plan_items {
          checked
          question_mark
        }
      }
    }
  }
`

export const MEAL_QUERY = gql`
  query getMealById($meal_id: Int!) {
    meal(where: { meal_id: { _eq: $meal_id } }) {
      meal_id
      description
      diet_type
      leftovers
      image_url
      serves
      recipe_book
      meal_tags {
        tag
      }
      meal_ingredients {
        quantity
        unit {
          unit_id
        }
        ingredient {
          ingredient_id
          description
          store_location {
            store_location_id
          }
        }
      }
    }
  }
`

export const ADD_MEAL_TO_PLAN = gql`
  mutation insert_meal_plan($meal: [meal_ingredient_plan_item_insert_input!]!) {
    insert_meal_ingredient_plan_item(objects: $meal) {
      returning {
        meal_id
      }
    }
  }
`

export const REMOVE_MEAL_FROM_PLAN = gql`
  mutation delete_meal_ingredient_plan_item($meal_id: Int!) {
    delete_meal_ingredient_plan_item(where: { meal_id: { _eq: $meal_id } }) {
      affected_rows
    }
  }
`
