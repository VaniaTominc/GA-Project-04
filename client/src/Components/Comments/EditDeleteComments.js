import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Error404Message from '../errors/Error404Message'
import Error422Message from '../errors/Error422Message'
import { checkUserIsAuthenticated } from '../authentication/auth'


const EditDeleteComments = () => {

  // const [hasError, setHasError] = useState(false)

  const oldURL = document.referrer
  // console.log('oldurl >>>', oldURL)
  const lastNumberId = oldURL.slice(21)
  // console.log('lastNumberId >>>', lastNumberId)



  const { id } = useParams()
  // console.log('ID from Params >>>', id)

  // const payload = getPayload()

  const [commentToEdit, setCommentToEdit] = useState({
    text: '',
    rating: '',
    truffle: id,
    // owner: payload.sub,
  })

  useEffect(() => {

    const getData = async() => {

      try {
        const { data } = await axios.get(`/api/opinions/${id}/`)
        // console.log('incoming >>>', data)
        data.truffle = data.truffle.id            // The way how to get products_to_update id. 
        setCommentToEdit(data)

      } catch (err) {
        console.log('Something has gone wrong >>>', err.message)
        // setHasError(true)
      }
    }
    getData()
  }, [id])

  const handleCommentChange = (event) => {
    const newComment = { ...commentToEdit, [event.target.name]: event.target.value }
    setCommentToEdit(newComment)
  }

  // console.log('INCOMING DATA >>>', commentToEdit)

  const handleCommentChangeSubmit = async (event) => {
    event.preventDefault()

    try {
      const token = window.localStorage.getItem('token')

      await axios.put(`/api/opinions/${id}/`, commentToEdit,
        {
          headers: {
            Authorization: `Bearer ${token}` },
        }
      )

      location.assign(lastNumberId)

    } catch (err) {
      // setHasError(true)
      console.log('Incoming error from submiting changed comment >>>', err.response)
      window.alert('😱 Something has wrong with updating your comment 🆘')
    }
  }

  const deleteComment = async () => {
    try {
      const token = window.localStorage.getItem('token')
      await axios.delete(`/api/opinions/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}` },
      })
      location.assign('/')
    } catch (err) {
      console.log(err)
      // setHasError(true)
    }
  }

  return (
  
    <div className='content-container'>

      { commentToEdit ?
      
        <>

          { commentToEdit &&
          
            <>

              {

                checkUserIsAuthenticated() ?

                  <>

                    <div>
                      <section className='login-section'>
                        <div className='container'>

                          {/* Register view */}
                          <div className='user'>
                            <div className='formBox'>

                              <form onSubmit={handleCommentChangeSubmit} className='form-query-media'>
                                <h3 className='heading-delete-update-comment'>Update or Delete your comment!</h3>

                                <div className='rating-rating-container-edit'>
                                  <p className='rating-number-text-two'>Rate your experience from 1 to 5!</p>
                                  <div className='rating-box-three'>
                                    <input 
                                      type='number'
                                      name='rating'
                                      min='1'
                                      max='5'
                                      required
                                      value={commentToEdit.rating}
                                      onChange={handleCommentChange}
                                    />
                                  </div>
                                </div>

                                <div className='positioning-text-area-500'>
                                  <textarea
                                    placeholder='This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive.' 
                                    required 
                                    name='text'
                                    rows='6'
                                    cols='40'
                                    value={commentToEdit.text}
                                    onChange={handleCommentChange}
                                    className='text-area-comment-edit'
                                  />
                                </div>

                                <div className='update-delete-buttons'>
                                  <input 
                                    type='submit' 
                                    value='Update' 
                                    // onClick={handleCommentChangeSubmit}
                                    className='delete-buttons-space'
                                  />
                                  <input 
                                    type='submit' 
                                    value='Delete' 
                                    onClick={deleteComment}
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

                  </>

                  :

                  <Error422Message />

              }

            </>
          
          }


          

        </>

        :

        <Error404Message />


      }
      
    </div>
  
  )
}

export default EditDeleteComments