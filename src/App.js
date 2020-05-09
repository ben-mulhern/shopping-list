import React from "react"
import MainView from "./components/MainView"
import { Provider } from "react-redux"
import configureStore from "./state/configureStore"
import CssBaseline from "@material-ui/core/CssBaseline"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import apiClient from "./api/apiClient"

const App = (props) => (
  <Provider store={configureStore()}>
    <ApolloProvider client={apiClient}>
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <MainView />
        </BrowserRouter>
      </React.Fragment>
    </ApolloProvider>
  </Provider>
)

export default App
