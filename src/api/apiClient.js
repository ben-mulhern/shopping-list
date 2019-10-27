import ApolloClient from 'apollo-boost'
import Config from "../config/config.json"

const apiClient = new ApolloClient({
  uri: process.env.API_URL || Config.apiUrl,
  headers: {
    "x-hasura-admin-secret": process.env.API_KEY || Config.apiKey
  }
})

export default apiClient