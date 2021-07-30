import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  
  return (

    <footer className='footer'>
      <p className='footer-text'>
        © 2021 Truff<span className='logo-nav'>·l·</span>uxury by&nbsp;
        <Link to={{ pathname: 'https://www.linkedin.com/in/vanja-tominc-28286b210/' }} target='_blank' className='logo-nav'><strong className='engraved-two-normal-text'>Vania Tominc</strong></Link>&nbsp;for General Assembly London
      </p>
    </footer>

  )
}

export default Footer