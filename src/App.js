import React from 'react'
import MainView from './components/MainView'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import {HashRouter} from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'
import apiClient from './api/apiClient'

const App = () => (
  <ApolloProvider client={apiClient}>
    <Provider store={configureStore()}>
      <React.Fragment>
        <CssBaseline />   
        <HashRouter>
          <MainView />
        </HashRouter> 
      </React.Fragment>
    </Provider>  
  </ApolloProvider>
)

export default App
