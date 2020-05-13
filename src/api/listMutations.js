import { gql } from "apollo-boost"

// Still to do:
// Create ingredient on the fly and add it
// Update a particular entry, which could entail creating a new ingredient

export const ADD_LIST_ITEMS = gql`
  mutation add_list_items($items: [shopping_list_item_insert_input!]!) {
    insert_shopping_list_item(objects: $items) {
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

export const DELETE_UNTICKED_ITEMS = gql`
  mutation delete_unticked_items {
    delete_shopping_list_item(where: { ticked_at: { _eq: null } }) {
      affected_rows
    }
  }
`
