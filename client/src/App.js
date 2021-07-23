import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './Components/Home'

const App = () => {
  
  return (
    
    <BrowserRouter>

      <Navbar />

      <Switch>
        <Route path='/about'>
          <About />
        </Route>

        <Route path='/home'>
          <Home />
        </Route>

        <Route path='/'>

        </Route>
      </Switch>

    </BrowserRouter>

  )
}

export default App
