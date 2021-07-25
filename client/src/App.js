import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Components/Home'
// import About from './Components/About'

// Authentication components
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import ProfilePage from './Components/Authentication/ProfilePage'

// Proper components
import Shop from './Components/Products/Shop'
import FilteredByCategory from './Components/Products/FilteredByCategory'

// Dummy commponent
import ProductsInfoPage from './Components/Products/ProductsInfoPage'

const App = () => {
  
  return (
    
    <BrowserRouter>

      <Navbar />

      <Switch>

        <Route path='/profile/'>
          <ProfilePage />
        </Route>

        <Route path='/categories/product/:id'>

        </Route>

        <Route path='/categories/:id'>
          <FilteredByCategory />
        </Route>

        <Route path='/shop'>
          <Shop />
        </Route>

        <Route path='/register'>
          <Register />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/about'>
          <ProductsInfoPage />
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
