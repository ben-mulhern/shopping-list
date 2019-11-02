import ApolloClient from 'apollo-boost'

const apiClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  request: (operation) => {
    const apiKey = sessionStorage.getItem('API_KEY')
    operation.setContext({
      headers: {
        "x-hasura-admin-secret": apiKey || ''
      }
    })
  }
})

export default apiClient