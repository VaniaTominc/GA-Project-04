import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Components/Home'
// import About from './Components/About'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'

import ProductsShowAll from './Components/Products/ProductsShowAll'


const App = () => {
  
  return (
    
    <BrowserRouter>

      <Navbar />

      <Switch>

        <Route path='/shop'>
          <ProductsShowAll />
        </Route>

        <Route path='/register'>
          <Register />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        {/* <Route path='/about'>
          <About />
        </Route> */}

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
