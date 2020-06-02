import { gql } from "apollo-boost"

// Still to do:
// Update a particular entry, which could entail creating a new ingredient
// What about changing the store location on an existing ingredient?

export const ADD_LIST_ITEMS = gql`
  mutation add_list_items($items: [shopping_list_item_insert_input!]!) {
    insert_shopping_list_item(objects: $items) {
      returning {
        item_id
      }
    }
  }
`

// Here's how the variable would look for inserting an item with a new ingredient on the fly:
// Todo - Maybe we could change how meals are committed?
// {
//   "items" : [{
//     "quantity": 2,
//     "unit_id": "g",
//     "question_mark": false,
//     "ingredient": {
//       "data": {
//         "description": "Bananas",
//         "store_location_id": "CITRUS"
//       }
//     }
//   }]
// }

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

export const DELETE_UNTICKED_ITEMS = gql`
  mutation delete_unticked_items {
    delete_shopping_list_item(where: { ticked_at: { _eq: null } }) {
      affected_rows
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
