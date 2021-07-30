/* eslint-disable no-unused-vars */
// import React from 'react'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getCurrentUser, getPayload } from './auth'
import { convertAmericanDate, star } from '../ExtraFunctions/ReusableFunctions.js'
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
                <div>
                  <div className='outer-box-user-profile'>
                    <div className='positioning-left-box-user-profile'>
                      <h1 className='greeting-user-profile-page'>Welcome back <span className='logo-nav'>{currentUser.username}</span></h1>
                      <h3>Member since: {convertAmericanDate(currentUser.date_joined.slice(0, 10))}</h3>
                    </div>

                    <div>
                      <h3>YOUR INFO</h3>
                      <p>Username: {currentUser.username}</p>
                      <p>Email: {currentUser.email}</p>
                      <p>First Name: {currentUser.first_name}</p>
                      <p>Last Name: {currentUser.last_name}</p>

                      <div className='general-button'>
                        <a href={`profile/${currentUserId}`}>
                          <input 
                            type='submit' 
                            value='Update / Delete your account' 
                          />
                        </a>
                      </div>
                    
                    </div>
                  </div>
                </div>
                
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
                                      <a href={`/categories/product/${item.truffle.id}`} className='profile-page-a-tag'> 
                                        {item.truffle.name}
                                      </a>
                                    </summary>
                                    <div className='positioning-comments-profile-page'>
                                      <p>You reviewed <span className='bold'>{item.truffle.name}</span> on {convertAmericanDate(item.created_at.slice(0, 10))} {convertAmericanDate(item.created_at.slice(11, 19))}</p>
                                      <p>{star(item.rating)}</p>
                                    </div>
                                    <p className='comments-profile-page-styling'>{item.text}</p>
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