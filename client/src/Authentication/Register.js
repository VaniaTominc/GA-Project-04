import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Register = () => {

  // Handling user input
  const [registerData, setRegisterData] = useState({
    'username': '',
    'email': '',
    'password': '',
    'password_confirmation': '',
    'first_name': '',
    'last_name': '',
    'profile_image': '',
  })

  // Handling errors
  const [errors, setErrors] = useState('')

  // Handling received data
  const handleRegisterData = (event) => {
    const getUserData = { ...registerData, [event.target.name]: event.target.value }
  }

}

