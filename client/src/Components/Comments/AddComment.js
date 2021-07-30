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

          <div> 

            <form onSubmit={postComment}>

              <fieldset required onChange={incomingCommentData}>
                <span className='star-cb-group'>
                  <input type='radio' id='rating-5' name='rating' value={getCommentData.rating = '5'}/>
                  <label htmlFor='rating-5'>5</label>
                  <input type='radio' id='rating-4' name='rating' value={getCommentData.rating = '4'}/>
                  <label htmlFor='rating-4'>4</label>
                  {/* <input type='radio' id='rating-3' name='rating' value={getCommentData.rating = '3'}/>
                  <label htmlFor='rating-3'>3</label>
                  <input type='radio' id='rating-2' name='rating' value={getCommentData.rating = '2'}/>
                  <label htmlFor='rating-2'>2</label>
                  <input type='radio' id='rating-1' name='rating' value={getCommentData.rating = '1'}/> */}
                  <label htmlFor='rating-1'>1</label>
                  <input type='radio' id='rating-0' name='rating' value='0' className='star-cb-clear' />
                  <label htmlFor='rating-0'>0</label>
                </span>
              </fieldset>

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
              
              <input type='submit' value='Submit' onSubmit={postComment} />
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