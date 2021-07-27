import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'
import { useParams } from 'react-router-dom'
import AddComment from '../Comments/AddComment.js'
import Error404Message from '../Errors/Error404Message'
import { checkUserIsAuthenticated, getPayload } from '../Authentication/auth'

// Component showing individual product for sell

const ProductsInfoPage = () => {

  const [truffle, setTruffle] = useState([])
  const [hasError, setHasError] = useState(false)

  const { id } = useParams()

  useEffect(() => {

    const getData = async () => {

      try {

        const { data } = await axios.get(`/api/truffles/${id}/`)
        // console.log('OPINIONS >>>', data.opinions)               // The lenght of the opinion array

        setTruffle(data)    

      } catch (err) {
        setHasError(true)
        console.log('Display Product is not working properly! >>>', err.message)
      }

    }
    getData()
  
  }, [id])


  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    if (getPayload()) {
      setCurrentUserId(getPayload().sub)
    }
  }, [])

  

  return (

    <>

      { truffle ?
    
        <>

          <>
            <h1>DISPLAY CONTENT</h1>
            <p>{truffle.name}</p>
            <p>{truffle.description}</p>
            
            <>
              {
                truffle.photos &&

                <>

                  {truffle.photos.map(item => {
                    return (
                      <div key={item.id}>
                        <img src={item.imageurl} alt={truffle.name} />
                      </div>
                    )
                  })}

                </>

              }
            </>

          </>

          <section className='product-display-section'>

            <details>
              <summary>Description</summary>
              <p>{truffle.description}</p>
            </details>

            <details>
              <summary>Taste</summary>
              <p>{truffle.taste}</p>
            </details>

            <details>
              <summary>Use</summary>
              <p>{truffle.use}</p>
            </details>

            <details>
              <summary>Ingredients</summary>
              <p>{truffle.ingredients}</p>
            </details>

            <details>
              <summary>Alergies</summary>
              <p>{truffle.alergies}</p>
            </details>
            
            <details>
              <summary>Life</summary>
              <p></p>
            </details>

          </section>

          <h1>POSTED COMMENTS</h1>

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

                        {
                          currentUserId === item.owner ?

                            <a href={`/opinions/${item.id}`}>Do you want to edit?</a>

                            :

                            ''

                        }
                        
                      </div>
                    )
                  })
                } 
              </div>
            }
          </div>
      
          {

            checkUserIsAuthenticated() ?

              <AddComment />

              :

              <h1><a href='/login'>Login / Sign Up</a> to comment.</h1>

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