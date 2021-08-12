import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NavbarComponent from './components/NavbarComponent'
import Home from './components/Home'
import Footer from './components/Footer'

// Authentication components
import Login from './components/authentication/Login'
import ProfilePage from './components/authentication/ProfilePage'

// Proper components
import Shop from './components/products/Shop'
import FilteredByCategory from './components/products/FilteredByCategory'

// ! Dummy commponent
import ProductsInfoPage from './components/products/ProductsInfoPage'
import ProfileEditDelete from './components/authentication/ProfileEditDelete'
import EditDeleteComments from './components/comments/EditDeleteComments'
import Search from './components/searchbar/Search'
import Basket from './components/basket/Basket'


const App = () => {
  
  return (
    
    <BrowserRouter>

      <NavbarComponent />

      <Switch>

        <Route path='/opinions/:id'>
          <EditDeleteComments />
        </Route>

        <Route path='/profile/:id'>
          <ProfileEditDelete />
        </Route>

        <Route path='/categories/product/:id'>
          <ProductsInfoPage />
        </Route>

        <Route path='/categories/:id'>
          <FilteredByCategory />
        </Route>

        <Route path='/profile'>
          <ProfilePage />
        </Route>

        <Route path='/basket'>
          <Basket />
        </Route>

        <Route path='/shop'>
          <Shop />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/home'>
          <Search />
        </Route>

        <Route path='/'>
          <Home />
        </Route>

      </Switch>

      <Footer />

    </BrowserRouter>

  )
}

export default App
