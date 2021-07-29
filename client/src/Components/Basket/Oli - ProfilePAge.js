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
        // setTruffleProducts(data)
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

  // const [truffleProducts, setTruffleProducts] = useState({})
  // const [clickedBuy, setClickedBuy] = useState(false)

  const addTruffleToBasket = () => {
    const currentItems = JSON.parse(localStorage.getItem('truffles'))
    if (currentItems === null) {
      // if (truffle.id === tr)
      const itemToAddFirst = [{ ...truffle }]
      localStorage.setItem('truffles', JSON.stringify(itemToAddFirst))
      console.log('itemToAddFirst >>>', itemToAddFirst)
    } else {
      const itemsToAdd = [...currentItems, { ...truffle }]
      localStorage.setItem('truffles', JSON.stringify(itemsToAdd))
      console.log('itemToAdd >>>', itemsToAdd)
    }
    console.log('currentItems', currentItems)
    
    console.log('truffle', truffle)
  }


  

  return (
    <>
      {truffle ? (

        
        <div className='main-info-page'>

          {/* <section className='section-picture-cart'>

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
          
          </section> */}

          <main>
            <div className="container-display-page-1">
              <div className="grid product">
                <div className="column-xs-12 column-md-7">
                  <div className="product-gallery">
                    <div className="product-image">
                      <img className="active-picture" src="https://source.unsplash.com/W1yjvf5idqA"/>
                    </div>
                    <ul className="image-list">
                      <li className="image-item"><img src="https://source.unsplash.com/W1yjvf5idqA" className='display-photos' /></li>
                      <li className="image-item"><img src="https://source.unsplash.com/VgbUxvW3gS4" className='display-photos' /></li>
                      <li className="image-item"><img src="https://source.unsplash.com/5WbYFH0kf_8" className='display-photos' /></li>
                    </ul>
                  </div>
                </div>
                <div className="column-xs-12 column-md-5 right-site-price">
                  <h1 className='page-heading'>LOREM IPSUM DOLORIT</h1>
                  <h2 className='price-product'>£0.00</h2>
                  <div className="description">
                    <p>LOREIPSUMM DOLORIT</p>
                    <p>LOREMIPSUM DOLORIT</p>
                  </div>
                  <button className="add-to-cart">Add To Cart</button>
                </div>
              </div>
              <div className="grid related-products">
                <div className="column-xs-12">
                  <h3 className='smaller-heading'>You may also like</h3>
                </div>
                <div>
                  <div className="column-xs-12 column-md-4">
                    <img src="https://source.unsplash.com/miziNqvJx5M" className='display-photos' / >
                    <h4 className='xs-heading'>LOREM IPSUM</h4>
                    <p className="price">£0.00</p>
                  </div>
                  <div className="column-xs-12 column-md-4">
                    <img src="https://source.unsplash.com/2y6s0qKdGZg" className='display-photos' />
                    <h4 className='xs-heading'>LOREM IPSUM</h4>
                    <p className="price">£0.00</p>
                  </div>
                  <div className="column-xs-12 column-md-4">
                    <img src="https://source.unsplash.com/6Rs76hNbIWE" className='display-photos' / >
                    <h4 className='xs-heading'>LOREM IPSUM</h4>
                    <p className="price">£0.00</p>
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
            <button onClick={addTruffleToBasket}>Add</button>
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
            </section>

            {checkUserIsAuthenticated() ? (
              <AddComment />
            ) : (
              <h1>
                <a href='/login'>Login / Sign Up</a> to comment.
              </h1>
            )}

          </main>
      

          <>
            <h1>DISPLAY CONTENT</h1>
            <p>{truffle.name}</p>
            <p>{truffle.description}</p>

            <>
              
              <MovingGallery />

            </>
          </>

        </div>
      ) :
        <Error404Message />
      }


        

          
    </>
  )
}

export default ProductsInfoPage
