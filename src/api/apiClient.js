import ApolloClient from 'apollo-boost'
import Config from "../config/config.json"

const apiClient = new ApolloClient({
  uri: Config.apiUrl,
  headers: {
    "x-hasura-admin-secret": Config.apiKey
  }
})

export default apiClient