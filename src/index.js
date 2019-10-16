import React from 'react'
import ReactDOM from 'react-dom'    
import App from './App'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />    
      <App />
    </React.Fragment>
  </Provider>,  
  document.getElementById('root'))
