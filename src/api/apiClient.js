import ApolloClient from 'apollo-boost'


const apiClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_API_KEY
  }
})

export default apiClient