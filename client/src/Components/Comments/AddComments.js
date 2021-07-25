import React from 'react'
// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'


const AddComments = () => {

  // const { id } = useParams()

  // Handling user input
  // const [commentData, setCommentData] = ({
  //   text: '',
  //   rating: '',
  //   truffle: '',
  // })

  return (
    <>
      <h1>ADD COMMENTS SECTION</h1>
      <h2>Post your comment</h2>

      <div> 

        <form>

          <input 
            name='rating'
          />

          <textarea
            placeholder='This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive.' 
            required 
            name='text'
            rows='6'
            cols='70'
          />

          <br />

          <input 
            type="text"
            
            // value={}
            // onChange={}

          />

        </form>

      </div>

    </>

  )
}

export default AddComments