import React from 'react'
import {Route, HashRouter} from 'react-router-dom'
import Placeholder from './components/Placeholder.js'


const App = () => {

  // Check login status and show loading icon until we know
  // render login if not or show relevant page

  return (
      <HashRouter>
      <div className="App">

        <div>
          <Route exact path="/" component={Placeholder} /> 
        </div>   

      </div>
      </HashRouter>

  )
}

export default App
