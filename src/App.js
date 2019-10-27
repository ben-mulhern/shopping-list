import React from 'react'
import MainView from './components/MainView'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'
import apiClient from './api/apiClient'

const App = () => (
  <ApolloProvider client={apiClient}>
    <Provider store={configureStore()}>
      <React.Fragment>
        <CssBaseline />   
        <BrowserRouter>
          <MainView />
        </BrowserRouter> 
      </React.Fragment>
    </Provider>  
  </ApolloProvider>
)

export default App
