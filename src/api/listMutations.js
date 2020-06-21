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
