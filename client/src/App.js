import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NavbarComponent from './Components/NavbarComponent'
import Home from './Components/Home'
import Footer from './Components/Footer'

// Authentication components
import Login from './Components/Authentication/Login'
import ProfilePage from './Components/Authentication/ProfilePage'

// Proper components
import Shop from './Components/Products/Shop'
import FilteredByCategory from './Components/Products/FilteredByCategory'

// ! Dummy commponent
import ProductsInfoPage from './Components/Products/ProductsInfoPage'
import ProfileEditDelete from './Components/Authentication/ProfileEditDelete'
import EditDeleteComments from './Components/Comments/EditDeleteComments'
import Search from './Components/SearchBar/Search'
import Basket from './Components/Basket/Basket'


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
