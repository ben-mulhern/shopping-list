import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import Immutable from "immutable"
import { useMutation } from "@apollo/react-hooks"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import { withRouter } from "react-router-dom"
import omitDeep from "omit-deep-lodash"
import set from "lodash.set"
import { gql } from "apollo-boost"
import clsx from "clsx"
import cloneDeep from "lodash.clonedeep"
import { connect } from "react-redux"
import { WebSocketLink } from "apollo-link-ws"
import { createHttpLink } from "apollo-link-http"
import { split } from "apollo-link"
import { getMainDefinition } from "apollo-utilities"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { createStore } from "redux"
import Autocomplete from "@material-ui/lab/Autocomplete"

// "apollo-client": "^2.6.8",
// "graphql": "^15.0.0",
// "react-scripts": "^3.4.1",
// "subscriptions-transport-ws": "^0.9.16",

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
