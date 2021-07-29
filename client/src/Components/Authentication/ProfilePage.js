/* eslint-disable no-unused-vars */
// import React from 'react'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getCurrentUser, getPayload } from './auth'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'
import Error404Message from '../Errors/Error404Message'


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
      // console.log('INCOMING ID >>>', currentUserData.id)
      // console.log('OPINIONS >>>', currentUserData.opinions[0].truffle.name)

      setCurrentUser(currentUserData)
    }
    getCurrentUserData()
  }, []
  )



  return (
    
    <>

      <>

        { currentUser ? 

          <>
            { currentUser && 

              <>
                <h1>Welcome back {currentUser.username}</h1>
                <h3 className='profile-page-heading-1'>Member since: {convertAmericanDate(currentUser.date_joined.slice(0, 10))}</h3>

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

                      <h3>YOUR HAVE {currentUser.length} COMMENTS</h3>
                      {

                        <section>
                          {currentUser.opinions.map(item => {
                            return (
                              <div key={item.id}>
                                <section className='changing-according-profile'>
                                  <details>
                                    <summary>
                                      <a href={`/categories/product/${item.truffle.id}`}> 
                                        {item.truffle.name}
                                      </a>
                                      <p>{convertAmericanDate(item.created_at.slice(11, 19))} {convertAmericanDate(item.created_at.slice(0, 10))}</p>
                                    </summary>
                                    <p>{item.owner.username}</p>
                                    <p>{item.rating}</p>
                                    <p>{item.text}</p>
                                  </details>
                                </section>
                              </div>
                            )
                          })
                          }
                        </section>

                      }

                    </div>
                  }
                </div>

              </>
            }

          </>

          :

          <>
            <Error404Message />
          </>

        }

      </>

        

    </>

  )

}

export default ProfilePage