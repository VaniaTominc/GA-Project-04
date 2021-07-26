/* eslint-disable no-unused-vars */
// import React from 'react'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getCurrentUser, getPayload } from './auth'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'



const ProfilePage = () => {

  const history = useHistory()
  const { id } = useParams()

  const [currentUser, setCurrentUser] = useState(null)

  const [currentUserId, setCurrentUserId] = useState(null)

  const [populateProductName, setPopulateProductName] = useState([])


  useEffect(() => {
    if (getPayload()) {
      setCurrentUserId(getPayload().sub)
    }
  }, [])


  useEffect(() => {
    
    const getCurrentUserData = async () => {
      const currentUserData = await getCurrentUser()
      // console.log('INCOMING ID >>>', currentUserData.id)
      console.log('OPINIONS >>>', currentUserData.opinions[0].truffle.name)

      setCurrentUser(currentUserData)
    }
    getCurrentUserData()
  }, []
  )



  return (
    
    <>

     

      <>

        { currentUser && 

            <>
              <h1>Welcome back {currentUser.username}</h1>
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
                            <a href={`/categories/product/${item.truffle.id}`}> 
                              <h4>{item.truffle.name}</h4>
                            </a>
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