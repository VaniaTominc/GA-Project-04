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

// Dummy commponent
import ProductsInfoPage from './Components/Products/ProductsInfoPage'
import ProfileEditDelete from './Components/Authentication/ProfileEditDelete'
import AddComments from './Components/Comments/AddComments'

const App = () => {
  
  return (
    
    <BrowserRouter>

      <Navbar />

      <Switch>

        <Route path='/profile/:id'>
          <ProfileEditDelete />
        </Route>

        <Route path='/categories/product/:id'>
          <ProductsInfoPage />
        </Route>

        <Route path='/categories/:id'>
          <FilteredByCategory />
        </Route>

        <Route path='/profile/'>
          <ProfilePage />
        </Route>

        <Route path='/shop'>
          <Shop />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/about'>

        </Route>

        <Route path='/home'>
          <AddComments />
        </Route>

        <Route path='/'>

        </Route>
      </Switch>

    </BrowserRouter>

  )
}

export default App
