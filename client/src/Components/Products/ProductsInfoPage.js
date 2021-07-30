import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { convertAmericanDate } from '../ExtraFunctions/ReusableFunctions.js'
import { useParams } from 'react-router-dom'
import AddComment from '../Comments/AddComment.js'
// import Error404Message from '../Errors/Error404Message.js'
import { checkUserIsAuthenticated, getPayload } from '../Authentication/auth'
import { IoIosArrowUp } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import Carousel from 'react-bootstrap/Carousel'


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
    const currentProduct = JSON.parse(localStorage.getItem('test'))
    const productsToAdd = currentProduct ? [...currentProduct, { ...truffleProducts }] : [ { ...truffleProducts }]
    localStorage.setItem('test', JSON.stringify(productsToAdd))
    setClickedBuy(true)
  }
  console.log('products inside? >>>', truffleProducts)


  

  return (
    <>
      {truffle ? (

        
        <div className='main-info-page'>
          <main>
            <div className="container-display-page-1">
              <div className='left-side-display-page'>
                
                <img src={truffle.images} alt={truffle.name} className='info-picture'/>
                
              </div>
              <div className='right-side-display-page'>
                <div>
                  <div>
                    <h1 className='truffle-name'>{truffle.name}</h1>
                    <h3 className='truffle-price'>£{truffle.price}</h3>
                    {
                      truffle.price && 
                        <p className='short-description'>{(truffle.description).slice(0, 200)} ...</p>
                      
                    }
                  </div>
                  <div className='general-button-2' id='truffle-button'>
                    <input 
                      type='submit' 
                      onClick={addToCart}
                      value={clickedBuy ? 'Added' : 'Add'} 
                    />
                  </div>
                </div>
              </div>
            </div>
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

            <section>
              <Carousel>
                {truffle.photos &&
                    truffle.photos.map(item => {
                      return (
                        <Carousel.Item key={item.id}>
                          <img 
                            className="d-block w-100 h-120"
                            src={item.imageurl} 
                            alt={truffle.name} 
                          />
                        </Carousel.Item>
                      )
                    })
                }
              </Carousel>
            </section>

            <section>
              <h1 className='products-info-comment-heading'>COMMENTS</h1>

              <div>
                {truffle.opinions && (
                  <div className='embracing-comments'>
                    {truffle.opinions.map((item) => {
                      return (
                        <div key={item.id} className='outer-outer-comment-box'>
                          <div className='outer-comment-box'>
                            <div className='positioning-comments-display-page'>
                              <p>User {item.name}</p>
                              {currentUserId === item.owner ? (
                                <>
                                  <a href={`/opinions/${item.id}`}><FiEdit /></a>
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                            <div className='positioning-comments-display-page'>
                              <p>{star(item.rating)}</p>
                              <p>{convertAmericanDate(item.created_at.slice(11, 19))} {convertAmericanDate(item.created_at.slice(0, 10))}</p>
                            </div>
                          </div>

                          <p className='positioning-comments-display-page-two'>{item.text}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </section>

            {checkUserIsAuthenticated() ? (
              <AddComment />
            ) : (
              <h3 className='shop-heading-3 shop-heading-3-additional'>
                <a href='/login'>Login / Sign Up</a> to comment.
              </h3>
            )}

          </main>
    
     

        </div>
      ) :
        ''
        // <Error404Message /> 
      }


        

          
    </>
  )


}

export default ProductsInfoPage
