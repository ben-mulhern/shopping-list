import React from 'react'
import MainView from './components/MainView'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline'

const App = () => (
  <Provider store={configureStore()}>
    <React.Fragment>
      <CssBaseline />    
      <MainView />
    </React.Fragment>
  </Provider>  
)

export default App
