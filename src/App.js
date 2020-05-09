import React from "react"
//import MainView from "./components/MainView"
import { Provider } from "react-redux"
//import configureStore from "./state/configureStore"
import CssBaseline from "@material-ui/core/CssBaseline"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/react-hooks"
//import apiClient from "./api/apiClient"

const App = (props) => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <p>This is a test</p>
    </BrowserRouter>
  </React.Fragment>
)

export default App
