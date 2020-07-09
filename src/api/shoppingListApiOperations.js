import { gql } from "apollo-boost"

export const UPSERT_LIST_ITEM = gql`
  mutation add_list_items($item: shopping_list_item_insert_input!) {
    insert_shopping_list_item(
      objects: [$item]
      on_conflict: {
        constraint: pk_shopping_list
        update_columns: [quantity, unit_id, ingredient_id]
      }
    ) {
      returning {
        item_id
      }
    }
  }
`

export const TICK_ITEM = gql`
  mutation tick_item($itemId: Int!, $ts: timestamp!) {
    update_shopping_list_item(
      where: { item_id: { _eq: $itemId } }
      _set: { ticked_at: $ts }
    ) {
      affected_rows
      returning {
        item_id
      }
    }
  }
`

export const UNTICK_ITEM = gql`
  mutation tick_item($itemId: Int!) {
    update_shopping_list_item(
      where: { item_id: { _eq: $itemId } }
      _set: { ticked_at: null }
    ) {
      affected_rows
      returning {
        item_id
      }
    }
  }
`

export const SET_QUESTION_MARK = gql`
  mutation set_question_mark($itemId: Int!, $questionMark: Boolean!) {
    update_shopping_list_item(
      where: { item_id: { _eq: $itemId } }
      _set: { question_mark: $questionMark }
    ) {
      affected_rows
      returning {
        item_id
      }
    }
  }
`

export const REINSERT_LIST = gql`
  mutation reinsert_list($items: [shopping_list_item_insert_input!]!) {
    delete_shopping_list_item(where: { ticked_at: { _eq: null } }) {
      affected_rows
    }
    insert_shopping_list_item(objects: $items) {
      returning {
        item_id
      }
    }
  }
`

export const GET_LAST_TICKED_ITEM = gql`
  subscription getLastTickedItem {
    shopping_list_item(
      where: { ticked_at: { _is_null: false } }
      order_by: { ticked_at: desc }
      limit: 1
    ) {
      item_id
    }
  }
`

export const TICK_ALL = gql`
  mutation reinsert_list {
    delete_shopping_list_item(where: { ticked_at: { _eq: null } }) {
      affected_rows
    }
  }
`

export const SHOPPING_LIST_SUBSCRIPTION = gql`
  subscription {
    shopping_list_item(
      where: { ticked_at: { _is_null: true } }
      order_by: [
        { ingredient: { store_location: { shop_order: asc } } }
        { ingredient: { ingredient_id: asc } }
      ]
    ) {
      item_id
      quantity
      ticked_at
      question_mark
      unit {
        unit_id
      }
      ingredient {
        ingredient_id
        description
        store_location {
          store_location_id
          shop_order
        }
      }
    }
  }
`

export const LIST_DATA_QUERY = gql`
  query getMealIngredients($mealIds: [Int!]!) {
    meal_ingredient(where: { meal_id: { _in: $mealIds } }) {
      ingredient {
        ingredient_id
      }
      unit {
        unit_id
      }
      quantity
    }
    shopping_list_item(where: { ticked_at: { _is_null: true } }) {
      quantity
      unit {
        unit_id
      }
      question_mark
      ingredient {
        ingredient_id
      }
    }
  }
`
