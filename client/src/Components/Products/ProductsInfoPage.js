import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'
import { useParams } from 'react-router-dom'

// Component showing individual product for sell

const ProductsInfoPage = () => {

  const [truffle, setTruffle] = useState([])
  // const [hasError, setHasError] = useState(false)
  // const [productComments, setProductComments] = useState([])
  // const [populateCommentOwner, setPopulateCommentOwner] = useState([])

  const { id } = useParams()
  // const history = useHistory()

  useEffect(() => {

    const getData = async () => {

      try {

        const { data } = await axios.get(`/api/truffles/${id}/`)
        // console.log('OPINIONS >>>', data.opinions)               // The lenght of the opinion array

        setTruffle(data)    

        // console.log('ratings >>>', data.opinions.rating)


      } catch (err) {
        console.log('Display Product is not working properly! >>>', err.message)
      }

    }
    getData()
  
  }, [id])

  // ! PLAYING WITH POSTING COMMENTS

  // ? Handling user typing

  // const currentProduct = location.pathname
  // console.log('Current product page >>>', currentProduct)
  // Current product page >>> /categories/product/12


  const [getCommentData, setGetCommentData] = useState({
    text: '',
    rating: '',
    truffle: id,
  })

  const [errors, setErrors] = useState('')

  const incomingCommentData = (event) => {
    const getUserComment = { ...getCommentData, [event.target.name]: event.target.value }
    const newError = { ...errors, [event.target.name]: '' }
    setGetCommentData(getUserComment)
    setErrors(newError)
  }

  console.log('INCOMING DATA >>>', getCommentData)

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

      { truffle ?
      
        <div>

          <h1>Product Info</h1>
          <h2>PLAYING WITH COMMENTS</h2>
      
          <p>{truffle.name}</p>

          <div>
            { truffle.opinions && 
              <div>

                {
                  truffle.opinions.map(item => {
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
          
          
          {/* PLAYIING WITH ADDING COMMENTS SECTIONS  */}

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


        </div>

        


        :
        <>
          <h1>Something has gone wrong ...</h1>
        </>
      } 

    </>

  ) 
}

export default ProductsInfoPage