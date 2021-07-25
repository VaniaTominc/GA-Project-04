import React from 'react'
import { Link } from 'react-router-dom'
import { getPayload } from './Authentication/auth'


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
      <div className='logo'>
        <Link to='/' className='logo-link-style'>
          <h4>The nav</h4>
        </Link>
      </div>
      <ul className='nav-links'>
        <li>
          <Link to='/home' className='nav-links-style'>Home</Link>
        </li>
        <li>
          <Link to='/shop' className='nav-links-style'>Shop</Link>
        </li>
        <li>
          <Link to='about' className='nav-links-style'>About</Link>
        </li>

        { checkIfUserIsAuthenticated() ?

          <>

            <li>
              <Link to='/profile' className='nav-links-style'>Profile</Link>
            </li>

            <li>
              <Link
                to='/home'
                onClick={handleLogout}
                className='nav-links-style'
              >
                Log Out
              </Link>
            </li>

          </>

          :

          <li>
            <Link to='/login' className='nav-links-style'>Login</Link>
          </li>

        }

        <li>
          <Link to='#' className='nav-links-style'>Basket</Link>
        </li>
      </ul>

      <div className='burger'>
        <div className='burger-line-one'></div>
        <div className='burger-line-two'></div>
        <div className='burger-line-three'></div>
      </div>
    </nav>

  )
}

export default Navbar