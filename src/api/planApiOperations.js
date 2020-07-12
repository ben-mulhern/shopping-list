import { gql } from "apollo-boost"

// Toggle the QM on a checked item
// Toggle the checkedness of an item (if removing check then also remove QM)
// Set all ingredients of a meal to checked (i.e. add them to plan table)
// Set all ingredients of a meal to unchecked (i.e. remove them from plan table)

// export const UPSERT_INGREDIENTS = gql`
//   mutation upsert_ingredients($ingredients: [ingredient_insert_input!]!) {
//     insert_ingredient(
//       objects: $ingredients
//       on_conflict: {
//         constraint: pk_ingredient
//         update_columns: [description, store_location_id]
//       }
//     ) {
//       returning {
//         ingredient_id
//         description
//       }
//     }
//   }
// `
