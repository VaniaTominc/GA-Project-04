/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import axios from 'axios'
import { getCurrentUser, getTokenFromStorage } from './auth'
import Error404Message from '../Errors/Error404Message'

import { ProfileImageUpload } from './ProfileImageUpload'

import { AiOutlineDelete } from 'react-icons/ai'


const ProfileEditDelete = () => {

  const history = useHistory()
  const { id } = useParams()
  
  const [userToEdit, setUserToEdit] = useState({
    first_name: '',
    last_name: '',
    email_name: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
  })

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email_name: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
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
      history.push('/profile')
      // location.reload()
    } catch (err) {
      console.log('ERROR MESSAGE >>>', err)
      setErrors(err.response.data.errors)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    location.assign('/home')
  }

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/auth/profiles/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromStorage()}` },
      })
      handleLogout()
    } catch (err) {
      console.log(err)
    }
  }

  const imageToUpload = url => {
    setUserToEdit({ ... userToEdit, profile_image: url })
  }

  return (

    <>
      { userToEdit ?
    
        // <div>
        //   <h1>JUST BASIC EDIT / DELETE PROFILE FOR NOW</h1>

        //   <>
        //     { userToEdit && 
            
        //     <form onSubmit={handleSubmit}>

        //       <input 
        //         type='text' 
        //         name='username'
        //         placeholder='Username' 
        //         value={userToEdit.username}
        //         onChange={handleUserEdit}
        //         hidden
        //       />

        //       <br />

        //       <input 
        //         type='email' 
        //         name='email'
        //         placeholder='Email' 
        //         value={userToEdit.email}
        //         onChange={handleUserEdit}
        //         required
        //       />

        //       <br />

        //       <input 
        //         type='password' 
        //         name='password'
        //         placeholder='Create Password' 
        //         value={userToEdit.password}
        //         onChange={handleUserEdit}
        //         required
        //       />

        //       <br />

        //       <input 
        //         type='password'
        //         name='password_confirmation'
        //         placeholder='Confirm Password' 
        //         value={userToEdit.password_confirmation}
        //         onChange={handleUserEdit}
        //         required
        //       />

        //       <br />

        //       <input 
        //         type='text' 
        //         name='first_name'
        //         placeholder='First name' 
        //         value={userToEdit.first_name}
        //         onChange={handleUserEdit}
        //       />

        //       <br />

        //       <input 
        //         type='text' 
        //         name='first_name'
        //         placeholder='First name' 
        //         value={userToEdit.first_name}
        //         onChange={handleUserEdit}
        //       />

        //       <br />


              // <ProfileImageUpload
              //   value={userToEdit.image}
              //   name="image"
              //   handleImageUrl={imageToUpload}
              // />

              // <br />

              // <input 
              //   type='submit' 
              //   value='Update' 
              //   onSubmit={handleSubmit}
              // />

              // <input 
              //   type='submit' 
              //   value='Delete' 
              //   onClick={deleteUser}
              // />
        //     </form>
        //     }
        //   </>
          
        // </div>

        <div><h2>Update or Delete your account</h2>
        <section className='login-section'>
          <div className='container'>

            {/* Register view */}
            <div className='user'>
              <div className='formBox'>
                <form onSubmit={handleSubmit}>

                  <input 
                    type='text' 
                    name='username'
                    placeholder='Username' 
                    value={userToEdit.username}
                    onChange={handleUserEdit}
                    hidden
                  />

                  <label className='label-edit-delete'>Your email</label>
                  <input 
                    type='email' 
                    name='email'
                    placeholder='Email' 
                    value={userToEdit.email}
                    onChange={handleUserEdit}
                    required
                  />

                  <label className='label-edit-delete'>First name</label>
                  <input 
                    type='text' 
                    name='first_name'
                    placeholder='First name' 
                    value={userToEdit.first_name}
                    onChange={handleUserEdit}
                  />

                  <label className='label-edit-delete'>Last name</label>
                  <input 
                    type='text' 
                    name='first_name'
                    placeholder='Last name' 
                    value={userToEdit.last_name}
                    onChange={handleUserEdit}
                  />

                  <label className='label-edit-delete'>Your password</label>
                  <input 
                    type='password' 
                    name='password'
                    placeholder='Create Password' 
                    value={userToEdit.password}
                    onChange={handleUserEdit}
                    required
                  />

                  <label className='label-edit-delete'>Confirm password</label>
                  <input 
                    type='password'
                    name='password_confirmation'
                    placeholder='Confirm Password' 
                    value={userToEdit.password_confirmation}
                    onChange={handleUserEdit}
                    required
                  />

                  <div className='update-delete-buttons'>
                    <input 
                      type='submit' 
                      value='Update' 
                      onSubmit={handleSubmit}
                    />

                    <input 
                      type='submit' 
                      value='Delete' 
                      onClick={deleteUser}
                    />
                  </div>

                </form>
              </div>
              <div className='hidePicture'>
                <img src='https://i.ibb.co/hMF1RzD/Doggy-Snifing-Truffle.jpg' alt='a-cute-doggy' id='doggysnifing'/>
                <h1>rdfgdg</h1>
              </div>

            </div>

          </div>
          
        </section>
        </div>

        :

        <>
          <Error404Message />
        </>

      }

    </>

  )

}

export default ProfileEditDelete



