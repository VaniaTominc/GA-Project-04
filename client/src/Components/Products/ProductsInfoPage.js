import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'
import { useParams } from 'react-router-dom'
import AddComment from '../Comments/AddComment.js'
import Error404Message from '../Errors/Error404Message'
import { checkUserIsAuthenticated } from '../Authentication/auth'

// Component showing individual product for sell

const ProductsInfoPage = () => {

  const [truffle, setTruffle] = useState([])
  const [hasError, setHasError] = useState(false)
  // const [productComments, setProductComments] = useState([])
  // const [populateCommentOwner, setPopulateCommentOwner] = useState([])

  const { id } = useParams()
  // const history = useHistory()

  useEffect(() => {

    const getData = async () => {

      try {

        const { data } = await axios.get(`/api/truffles/${id}/`)
        // console.log('OPINIONS >>>', data.opinions)               // The lenght of the opinion array
        console.log('TRUFFLE PICTURES >>>', data.photos.imageurl)

        setTruffle(data)    

        // console.log('ratings >>>', data.opinions.rating)


      } catch (err) {
        setHasError(true)
        console.log('Display Product is not working properly! >>>', err.message)
      }

    }
    getData()
  
  }, [id])




  return (

    <>

      { truffle ?
    
        <>

          <h1>PLAYING WITH COMMENTS</h1>
      
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
                        <a href={`/opinions/${item.id}`}>Do you want to edit?</a>
                      </div>
                    )
                  })
                } 
              </div>
            }
          </div>
      
          {

            checkUserIsAuthenticated ?

              <AddComment />

              :

              <h1>Login in, so you can comment.</h1>

          }

        </>
      
        :

        hasError ? 
        
          <Error404Message />

          :

          <img src='https://thumbs.gfycat.com/BareJoyousAsp.webp' alt='Rick And Morty'/>

      } 

    </>

  ) 
}

export default ProductsInfoPage