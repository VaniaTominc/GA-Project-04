/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import axios from 'axios'
import { getCurrentUser, getTokenFromStorage } from './auth'


const ProfileEditDelete = () => {

  const history = useHistory()
  const { id } = useParams()
  
  const [userToEdit, setUserToEdit] = useState({
    first_name: '',
    last_name: '',
    email_name: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email_name: '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {

    const getCurrentUserData = async () => {
      const currentUserData = await getCurrentUser()

      setUserToEdit(currentUserData)
    }
    getCurrentUserData()
  }, [])

  const handleEditUser = (event) => {
    const newUserInfo = { ...userToEdit, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    setUserToEdit(newUserInfo)
    setErrors(newErrors)
  }

  return (

    <>
      <h1>JUST BASIC EDIT / DELETE PROFILE</h1>
    </>

  )

}

export default ProfileEditDelete