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

  const handleUserEdit = (event) => {
    const newUserInfo = { ...userToEdit, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    setUserToEdit(newUserInfo)
    setErrors(newErrors)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/auth/profiles/${id}/`, userToEdit,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromStorage()}` },
        }
      )
      history.push('/home')
    } catch (err) {
      console.log('ERROR MESSAGE >>>', err)
      setErrors(err.response.data.errors)
    }
  }

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/auth/profiles/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromStorage}` },
      })
      history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  console.log('CHANGED DATA >>>', userToEdit)
  console.log('ERRORS >>>', errors)

  return (

    <>
      { userToEdit ?
    
        <div>
          <h1>JUST BASIC EDIT / DELETE PROFILE FOR NOW</h1>

          <>
            { userToEdit && 
            
            <form onSubmit={handleSubmit}>

              <input 
                type='text' 
                name='username'
                placeholder='Username' 
                value={userToEdit.username}
                onChange={handleUserEdit}
                hidden
              />

              <br />

              <input 
                type='email' 
                name='email'
                placeholder='Email' 
                value={userToEdit.email}
                onChange={handleUserEdit}
                required
              />

              <br />

              <input 
                type='password' 
                name='password'
                placeholder='Create Password' 
                value={userToEdit.password}
                onChange={handleUserEdit}
                required
              />

              <br />

              <input 
                type='password'
                name='password_confirmation'
                placeholder='Confirm Password' 
                value={userToEdit.password_confirmation}
                onChange={handleUserEdit}
                required
              />

              <br />

              <input 
                type='text' 
                name='first_name'
                placeholder='First name' 
                value={userToEdit.first_name}
                onChange={handleUserEdit}
              />

              <br />

              <input 
                type='text' 
                name='last_name'
                placeholder='Last name' 
                value={userToEdit.last_name}
                onChange={handleUserEdit}
              />

              <br />

              <input 
                type='submit' 
                value='Update' 
                onSubmit={handleSubmit}
              />

              <input 
                type='submit' 
                value='Delete' 
                onSubmit={deleteUser}
              />
            </form>
            }
          </>
          
        </div>

        :

        <>
          <h1>Something has gone wrong</h1>
        </>

      }

    </>

  )

}

export default ProfileEditDelete