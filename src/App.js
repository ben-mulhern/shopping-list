import React from 'react'
import MainView from './components/MainView'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import {HashRouter} from 'react-router-dom'

const App = () => (
  <Provider store={configureStore()}>
    <React.Fragment>
      <CssBaseline />   
      <HashRouter>
        <MainView />
      </HashRouter> 
    </React.Fragment>
  </Provider>  
)

export default App
