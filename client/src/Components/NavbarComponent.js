import React from 'react'
import { getPayload } from './authentication/auth'
import Search from './searchbar/Search'
import { IoBasketOutline } from 'react-icons/io5'


const NavbarComponent = () => {

  const checkIfUserIsAuthenticated = () => {
    const payload = getPayload()

    if (!payload) return
    
    const currentTime = Math.round(Date.now() / 1000)
    return currentTime < payload.exp
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    location.assign('/home')
  }



  return (

    <>

      <input
        type='checkbox'
        id='active' 
      />
      <label htmlFor='active' className='menu-button'>
        <span></span>
      </label>
      <label htmlFor='active' className='close'></label>
      
      <div id='positioning-search-component'>
        <ul>
          <li>
            <Search />
          </li>
        </ul>
      </div>

      
      <h1 className='page-heading page-heading-media-query'><a href='/' className='logo-logo-logo'>Truff<span className='logo-nav'>·l·</span>uxury</a></h1>

      <div className='navbar-wrapper'>

        <ul>
          <li>
            <a href='/'>Home</a>
          </li>

          <li>
            <a href='/shop'>Shop</a>
          </li>

          { checkIfUserIsAuthenticated() ?

            <>

              <li>
                <a href='/profile'>Profile</a>
              </li>

              <li>
                <a
                  href='/'
                  onClick={handleLogout}
                >
                Log Out
                </a>
              </li>

            </>

            :

            <li>
              <a href='/login'>Login</a>
            </li>

          }

          <li>
            <a href='/basket'><IoBasketOutline /></a>
          </li>
        </ul>

      </div>

    </>

  )
}

export default NavbarComponent