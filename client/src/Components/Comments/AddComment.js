import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Error404Message from '../Errors/Error404Message'

// Component showing individual product for sell

const AddComment = () => {

  const { id } = useParams()
 
  // ! PLAYING WITH POSTING COMMENTS

  const [getCommentData, setGetCommentData] = useState({
    text: '',
    rating: '',
    truffle: id,
  })

  const [errors, setErrors] = useState(
    {
      text: '',
      rating: '',
      truffle: '',
    }
  )

  const incomingCommentData = (event) => {
    const getUserComment = { ...getCommentData, [event.target.name]: event.target.value }
    const newError = { ...errors, [event.target.name]: '' }
    setGetCommentData(getUserComment)
    setErrors(newError)
  }

  // console.log('INCOMING DATA >>>', getCommentData)

  // ? Comment to the backend
  const postComment = async (event) => {
    event.preventDefault()

    try {
      const token = window.localStorage.getItem('token')

      await axios.post('/api/opinions/', getCommentData,
        {
          headers: {
            Authorization: `Bearer ${token}` },
        }
      )

      location.assign(`/categories/product/${id}`)

    } catch (err) {
      console.log('🆘 Something is wrong with posting a comment >>>', err.message)
      window.alert('Something went wrong 😬')
    }
  }

  return (

    <>

      { getCommentData ?
      
        <>

          <h1>ADD COMMENTS SECTION</h1>
          <h2>Post your comment</h2>

          <div> 

            <form onSubmit={postComment}>

              <input 
                type='number'
                name='rating'
                min='1'
                max='5'
                required
                value={getCommentData.rating}
                onChange={incomingCommentData}
              />

              <br />

              <textarea
                placeholder='This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive.' 
                required 
                name='text'
                rows='6'
                cols='70'
                value={getCommentData.text}
                onChange={incomingCommentData}
              />

              <br />

              <input type='submit' value='Submit' />
            </form>

          </div>

        </>

        :

        <>
          <Error404Message />
        </>
        
      }



    </>

  ) 
}

export default AddComment