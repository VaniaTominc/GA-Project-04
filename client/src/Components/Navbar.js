import React from 'react'
import { getPayload } from './Authentication/auth'
import Search from './SearchBar/Search'


const Navbar = () => {

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
      
      <div className='navbar-wrapper'>

        <ul>
          <li>
            <a href='/'>The nav</a>
          </li>
        </ul>

        <ul>
          <li>
            <Search />
          </li>

          <li>
            <a href='/home'>Home</a>
          </li>

          <li>
            <a href='/shop'>Shop</a>
          </li>

          <li>
            <a href='about'>About</a>
          </li>

          { checkIfUserIsAuthenticated() ?

            <>

              <li>
                <a href='/profile'>Profile</a>
              </li>

              <li>
                <a
                  href='/home'
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
            <a href='/basket'>Basket</a>
          </li>
        </ul>

      </div>

    </>

  )
}

export default Navbar