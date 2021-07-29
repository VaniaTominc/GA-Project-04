import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'
import { useParams } from 'react-router-dom'
import AddComment from '../Comments/AddComment.js'
import Error404Message from '../Errors/Error404Message.js'
import { checkUserIsAuthenticated, getPayload } from '../Authentication/auth'
// import EditDeleteComments from '../Comments/EditDeleteComments.js'
import MovingGallery from '../Image Gallery/MovingGallery.js'

import { IoIosArrowUp } from 'react-icons/io'

// Component showing individual product for sell

const ProductsInfoPage = () => {
  const [truffle, setTruffle] = useState([])
  // const [hasError, setHasError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/truffles/${id}/`)
        // console.log('OPINIONS >>>', data.opinions)               // The lenght of the opinion array

        setTruffle(data)
        setTruffleProducts(data)
      } catch (err) {
        //setHasError(true)
        console.log(
          'Display Product is not working properly! >>>',
          err.message
        )
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

  const star = (item) => {
    return '⭐️'.repeat(item)
  }

  const [truffleProducts, setTruffleProducts] = useState({})
  const [clickedBuy, setClickedBuy] = useState(false)

  const addToCart = () => {
    const currentProduct = JSON.parse(localStorage.getItem('truffluxious'))
    const productsToAdd = currentProduct ? [...currentProduct, { ...truffleProducts }] : [ { ...truffleProducts }]
    localStorage.setItem('truffluxious', JSON.stringify(productsToAdd))
    setClickedBuy(true)
  }
  console.log('products inside? >>>', truffleProducts)


  

  return (
    <>
      {truffle ? (
        <div className='main-info-page'>

          <section className='section-picture-cart'>

            <div className='section-picture-cart-outline'>
              <div className='left-side-gallery'>
                {truffle.photos &&
                
                  truffle.photos.map(item => {
                    return (
                      <img key={item.id} src={item.imageurl} alt='pictures-of-product' />
                    )
                  })
                }
              </div>
              <div className='right-side-price'>
                <p>{truffle.name}</p>
                <p>{truffle.description}</p>
              </div>
            </div>
          
          </section>

          <>
            <h1>DISPLAY CONTENT</h1>
            <p>{truffle.name}</p>
            <p>{truffle.description}</p>

            <>
              
              <MovingGallery />

            </>
          </>

          <section className='links'>
            <div className='sidenav'>
              <a href={`/categories/product/${id}`}><h1 className='rotating-links rotate-links'>Product</h1></a>
            </div>
            <IoIosArrowUp size={20} />
            <div className='sidenav'>
              <a href='#'><h1 className='rotating-links rotate-links'>Category</h1></a>
            </div>
            <IoIosArrowUp size={20} />
            <div className='sidenav'>
              <a href='/shop'><h1 className='rotating-links rotate-links'>Shop</h1></a>
            </div>
          </section>
          <button onClick={addToCart}>{clickedBuy ? 'Added to basket' : 'Buy Item'}</button>
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
            {truffle.opinions && (
              <div>
                {truffle.opinions.map((item) => {
                  return (
                    <div key={item.id}>
                      <p>{item.owner.username}</p>
                      <p>
                        {convertAmericanDate(item.created_at.slice(11, 19))}
                        {convertAmericanDate(item.created_at.slice(0, 10))}
                      </p>
                      <p>{star(item.rating)}</p>
                      <p>{item.text}</p>

                      {currentUserId === item.owner ? (
                        <>
                          <a href={`/opinions/${item.id}`}>
                            Do you want to edit?
                          </a>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {checkUserIsAuthenticated() ? (
            <AddComment />
          ) : (
            <h1>
              <a href='/login'>Login / Sign Up</a> to comment.
            </h1>
          )}
        </div>
      ) :
        <Error404Message />
      }
    </>
  )
}

export default ProductsInfoPage
