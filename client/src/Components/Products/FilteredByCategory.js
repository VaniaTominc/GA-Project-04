import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Error404Message from '../Errors/Error404Message'
import { IoIosBasket } from 'react-icons/io'

const FilteredByCategory = () => {

  const [categories, setCategories] = useState([])
  const [hasError, setHasError] = useState(false)
  const [categoryName, setCategoryName] = useState('')

  const { id } = useParams()

  useEffect(() => {

    const getData = async () => {

      try {
        // const { data } = await axios.get('/api/categories/2/')
        const { data } = await axios.get(`/api/categories/${id}`)
        // console.log('DATA FROM CATEGORIES >>>', data[1].truffles[0])
        // console.log('data.name', data.name)
        setCategories(data.truffles)
        setCategoryName(data.name)

      } catch (err) {
        console.log(err.message)
        setHasError(true)
      }
    }

    getData()
  }, [id])

  // console.log('CATEGORY NAME >>>', categoryName)

  return (

    <div className='content-container'>
      { categories ? 
        <>

          { categoryName &&
            <div className='shop-top-margin-product'>
              <div className='shop-top-description-2'>
                <div className='links-category'>
                  <div className='sidenav filtered-category-visible'>
                    <a href='#'><h1 className='rotating-links rotate-links'>Category</h1></a>
                  </div>
                  <div className='sidenav dots-positioning filtered-category-visible'>
                    <h1 className='rotating-links rotate-links dots-spacing'>····</h1>
                  </div>
                  <div className='sidenav'>
                    <a href='/shop'><h1 className='rotating-links rotate-links'>Shop</h1></a>
                  </div>
                </div>
                <h1 className='shop-heading-1'>You are viewing <span className='logo-nav'>{categoryName}</span> category</h1>
              </div>
            </div>
          }

          <div className='outside-container'>

            {
              categories ?

                categories.map(item => {
                  return (
                    <div key={item.id} className='middle-category-container'>
                      
                      <div className='container container-border' style={{
                        backgroundImage: `url(${item.images})`,
                      }}>
                        <div className='overlay overlay-positioning-like overlay-color'>
                          <label className='like'>
                            <input type='checkbox' id='input-heart'/>
                            <div className='hearth'/>
                          </label>
                          <div className= 'items'></div>
                          <div className= 'items head'>
                            <a href={`/categories/product/${item.id}`}>
                              <p className='category-writing-styling'>{item.name}</p>
                            </a>
                            <hr></hr>
                          </div>
                          <div className= 'items price'>
                            <p className='new category-writing-styling'>£{item.price}</p>
                          </div>
                          <div className='items cart .cart-positioning'>
                            <a href={'/basket'}><IoIosBasket size={16}/></a>
                            <span className='category-writing-styling'>ADD TO CART</span>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  )
                })
                :
                <></>
            }

          </div>
        </>
        :

        hasError ?

          <Error404Message />

          :

          <>

            <img src='https://thumbs.gfycat.com/BareJoyousAsp.webp' alt='Rick And Morty'/>
          
          </>
          
      }

    </div>
  )
}

export default FilteredByCategory