import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({  
  uri: process.env.REACT_APP_API_URL
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_API_WS_URL, 
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": sessionStorage.getItem('API_KEY') || ''
      }
    }
  } 
})

const authLink = setContext((_, { headers }) => {
  console.log("Authlink called")
  const apiKey = sessionStorage.getItem('API_KEY')
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": apiKey || ''
    }
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

// Instantiate client
const apiClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default apiClient