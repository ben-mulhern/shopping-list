import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Route, HashRouter} from 'react-router-dom'
import Placeholder from './components/Placeholder.js'


const App = () => {

  return (
    <React.Fragment>
      <CssBaseline />
      <HashRouter>
      <div className="App">

        <div>
          <Route exact path="/" component={Placeholder} /> 
        </div>   

      </div>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
