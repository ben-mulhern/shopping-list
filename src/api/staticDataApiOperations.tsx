import { gql } from "apollo-boost"

export const QUERY_STATIC_DATA = gql`
  query getStaticData {
    unit {
      unit_id
    }
    store_location(order_by: { shop_order: asc }) {
      store_location_id
    }
    ingredient {
      ingredient_id
      description
      store_location {
        store_location_id
      }
    }
  }
`

export const LOGIN_TEST = gql`
  {
    unit {
      unit_id
    }
  }
`
