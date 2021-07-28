import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
// import Home from './Components/Home'
// import About from './Components/About'

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
import Error404Message from './Components/Errors/Error404Message'
import Basket from './Components/Basket/Basket'
// import MovingGallery from './Components/Image Gallery/MovingGallery'


const App = () => {
  
  return (
    
    <BrowserRouter>

      <Navbar />

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
          <Error404Message />
        </Route>
      </Switch>

    </BrowserRouter>

  )
}

export default App
