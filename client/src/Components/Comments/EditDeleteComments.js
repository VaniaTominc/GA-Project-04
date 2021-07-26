import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { getPayload } from './auth'


const EditDeleteComments = () => {

  // ! PLAYING WITH EDITING COMMENT

  // const currentProduct = location.pathname
  // console.log('Current product page >>>', currentProduct)
  // const myString = currentProduct
  // const newString = myString.replace(/[^\d]/g, '')
  // console.log('NEW STRING >>>', newString)


  const { id } = useParams()
  console.log('ID from Params >>>', id)

  // const payload = getPayload()

  const [commentToEdit, setCommentToEdit] = useState({
    text: '',
    rating: '',
    truffle: id,
    // owner: payload.sub,
  })

  useEffect(() => {

    const getData = async() => {
      const { data } = await axios.get(`/api/opinions/${id}/`)
      console.log('incoming >>>', data)
      data.truffle = data.truffle.id            // The way how to get products_to_update id. 
      setCommentToEdit(data)
    }
    getData()
  }, [id])

  const handleCommentChange = (event) => {
    const newComment = { ...commentToEdit, [event.target.name]: event.target.value }
    setCommentToEdit(newComment)
  }

  console.log('INCOMING DATA >>>', commentToEdit)

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

      location.assign(`/categories/product/${id}`)

    } catch (err) {
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
    }
  }

  return (
  
    <>

      <h1>ADD COMMENTS SECTION</h1>
      <h2>Post your comment</h2>

      <div> 

        <form onSubmit={handleCommentChangeSubmit}>

          <input 
            type='number'
          />

          <input 
            type='number'
            name='rating'
            min='1'
            max='5'
            required
            value={commentToEdit.rating}
            onChange={handleCommentChange}
          />

          <br />

          <textarea
            placeholder='This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive.' 
            required 
            name='text'
            rows='6'
            cols='70'
            value={commentToEdit.text}
            onChange={handleCommentChange}
          />

          <br />

          <input type='submit' value='Submit' />
          <input type='submit' value='Delete' onClick={deleteComment} />
        </form>

      </div>

    </>
  
  )
}

export default EditDeleteComments