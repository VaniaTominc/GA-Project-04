/* eslint-disable no-unused-vars */
// import React from 'react'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getCurrentUser, getPayload, checkUserIsAuthenticated } from './auth'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'



const ProfilePage = () => {

  const history = useHistory()
  const { id } = useParams()

  const [currentUser, setCurrentUser] = useState(null)

  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    if (getPayload()) {
      setCurrentUserId(getPayload().sub)
    }
  }, [])


  useEffect(() => {
    
    const getCurrentUserData = async () => {
      const currentUserData = await getCurrentUser()
      console.log('INCOMING ID >>>', currentUserData.id)

      setCurrentUser(currentUserData)
    }
    getCurrentUserData()
  }, []
  )



  return (
    
    <>

     

      <>
      
        <h1>Profile page</h1>

        { currentUser && 

            <>
              <p>Welcome back <strong>{currentUser.username}</strong></p>
              <p>Member since: {convertAmericanDate(currentUser.date_joined.slice(0, 10))}</p>

              <h3>YOUR INFO</h3>
              <p>Username: {currentUser.username}</p>
              <p>Email: {currentUser.email}</p>
              <p>First Name: {currentUser.first_name}</p>
              <p>Last Name: {currentUser.last_name}</p>

              <a href={`profile/${currentUserId}`}>
                <h3>
                  EDIT / DELETE YOUR PROFILE
                </h3>
              </a>
              
              <div>
                { currentUser.opinions &&
                  <div>
                    <h3>YOUR COMMENTS SO FAR</h3>
                    {

                      currentUser.opinions.map(item => {
                        return (
                          <div key={item.id}>
                            <p>{item.owner.username}</p>
                            <p>{convertAmericanDate(item.created_at.slice(11, 19))} {convertAmericanDate(item.created_at.slice(0, 10))}</p>
                            <p>{item.rating}</p>
                            <p>{item.text}</p>
                          </div>
                        )
                      })

                    }

                  </div>
                }
              </div>

            </>
        }

      </>

        

    </>

  )

}

export default ProfilePage