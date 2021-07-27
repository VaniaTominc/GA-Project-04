import React from 'react'
import { Link } from 'react-router-dom'
import { getPayload } from './Authentication/auth'
import Search from './SearchBar/Search'


const Navbar = () => {

  // const history = useHistory()

  const checkIfUserIsAuthenticated = () => {
    const payload = getPayload()

    if (!payload) return
    
    const currentTime = Math.round(Date.now() / 1000)
    return currentTime < payload.exp
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    location.assign('/home')
    // history.push('/home')
    // location.pathname
  }

  const toggleBurger = () => {
    // const burger = document.querySelector('.burger')
    // const navbar = document.querySelector('.nav-links')
    // const navLinks = document.querySelectorAll('.nav-links li')

    document.querySelector('.burger').addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('nav-active')

      document.querySelectorAll('.nav-links li').forEach((link, index) => {
        // console.log('index / 5 + 1.5 >>', index / 5 + 1.5)
        if (link.style.animation) {
          link.style.animation = ''
        } else {
          link.style.animation = `navLinkFade .5s ease forwards ${index / 5 + 1.5}s`
        }
      })

      document.querySelector('.burger').classList.toggle('toggle')

    })

  }

  // const navbarSlide = () => {
  //   document.querySelector('.burger').addEventListener('click', () => {
  //     document.querySelector('.nav-links').classList.toggle('nav-active')
  // }

  // const toggleBurger = () => {
  //   document.querySelector('.burger').classList.toggle('nav-links')
  //   // document.querySelector('.container').classList.toggle('active')
  // }

  // window.onload = function () {
  //   navbarSlide()
  // }

  return (

    <nav onClick={toggleBurger}>
      <div>
        <Link to='/'>
          <h4>The nav</h4>
        </Link>
      </div>
      <ul>
        <li>
          <div><Search /></div>
        </li>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        <li>
          <Link to='about'>About</Link>
        </li>

        { checkIfUserIsAuthenticated() ?

          <>

            <li>
              <Link to='/profile'>Profile</Link>
            </li>

            <li>
              <Link
                to='/home'
                onClick={handleLogout}
                
              >
                Log Out
              </Link>
            </li>

          </>

          :

          <li>
            <Link to='/login'>Login</Link>
          </li>

        }

        <li>
          <Link to='/basket'>Basket</Link>
        </li>
      </ul>

    </nav>

  )
}

export default Navbar