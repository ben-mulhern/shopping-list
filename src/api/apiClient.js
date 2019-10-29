import ApolloClient from 'apollo-boost'
import {apiUrl, apiKey} from '../config'

const apiClient = new ApolloClient({
  uri: apiUrl,
  headers: {
    "x-hasura-admin-secret": apiKey
  }
})

export default apiClient