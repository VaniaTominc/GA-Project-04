import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Error404Message from '../Errors/Error404Message'
import Error422Message from '../Errors/Error422Message'
import { checkUserIsAuthenticated } from '../Authentication/auth'


const EditDeleteComments = () => {

  // const [hasError, setHasError] = useState(false)

  const oldURL = document.referrer
  console.log('oldurl >>>', oldURL)
  const lastNumberId = oldURL.slice(21)
  console.log('lastNumberId >>>', lastNumberId)



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
      await axios.delete(`/api/opinions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` },
      })
      location.assign('/home')
    } catch (err) {
      console.log(err)
      // setHasError(true)
    }
  }

  return (
  
    <>

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

                              <form onSubmit={handleCommentChangeSubmit}>
                                <h3>Update or Delete your comment!</h3>

                                <fieldset className='fieldset-no-border' required>
                                  <span className='star-cb-group'>
                                    <input type='radio' id='rating-5' name='rating' value={commentToEdit.rating = 5} onChange={handleCommentChange}/>
                                    <label htmlFor='rating-5'>5</label>
                                    <input type='radio' id='rating-4' name='rating' value={commentToEdit.rating = 4} onChange={handleCommentChange}/>
                                    <label htmlFor='rating-4'>4</label>
                                    <input type='radio' id='rating-3' name='rating' value={commentToEdit.rating = 3} onChange={handleCommentChange}/>
                                    <label htmlFor='rating-3'>3</label>
                                    <input type='radio' id='rating-2' name='rating' value={commentToEdit.rating = 2} onChange={handleCommentChange}/>
                                    <label htmlFor='rating-2'>2</label>
                                    <input type='radio' id='rating-1' name='rating' value={commentToEdit.rating = 1} onChange={handleCommentChange}/>
                                    <label htmlFor='rating-1'>1</label>
                                    <input type='radio' id='rating-0' name='rating' value='0' className='star-cb-clear' />
                                    <label htmlFor='rating-0'>0</label>
                                  </span>
                                </fieldset>

                                <textarea
                                  placeholder='This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive.' 
                                  required 
                                  name='text'
                                  rows='6'
                                  cols='40'
                                  value={commentToEdit.text}
                                  onChange={handleCommentChange}
                                />

                                <div className='update-delete-buttons'>
                                  <input 
                                    type='submit' 
                                    value='Update' 
                                    onSubmit={handleCommentChangeSubmit}
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
      
    </>
  
  )
}

export default EditDeleteComments