import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Error404Message from '../Errors/Error404Message'
import { IoIosBasket, IoIosArrowUp } from 'react-icons/io'

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
        console.log('data.name', data.name)
        setCategories(data.truffles)
        setCategoryName(data.name)

      } catch (err) {
        console.log(err.message)
        setHasError(true)
      }
    }

    getData()
  }, [id])

  console.log('CATEGORY NAME >>>', categoryName)

  return (

    <>
      { categories ? 
        <>
  
          { categoryName &&
            <h1>You are viewing {categoryName} category</h1>
          }
  
          <div className='links'>
            <div className='sidenav'>
              <a href='#'><h1 className='rotating-links rotate-links'>Category</h1></a>
            </div>
            <IoIosArrowUp size={20} />
            <div className='sidenav'>
              <a href='/shop'><h1 className='rotating-links rotate-links'>Shop</h1></a>
            </div>
          </div>

          <div className='outside-container'>

            {
              categories ?

                categories.map(item => {
                  return (
                    <div key={item.id} className='middle-category-container'>
                      <a href={`/categories/product/${item.id}`}>
                        <div className='container' style={{
                          backgroundImage: `url(${item.images})`,
                        }}>
                          <div className='overlay overlay-positioning-like'>
                            <label className='like'>
                              <input type='checkbox' id='input-heart'/>
                              <div className='hearth'/>
                            </label>
                            <div className= 'items'></div>
                            <div className= 'items head'>
                              <p>{item.name}</p>
                              <hr></hr>
                            </div>
                            <div className= 'items price'>
                              <p className='new'>£{item.price}</p>
                            </div>
                            <div className='items cart .cart-positioning'>
                              <a href={'/basket'}><IoIosBasket size={16}/></a>
                              <span>ADD TO CART</span>
                            </div>
                          </div>
                        </div>
                      </a>
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

    </>
  )
}

export default FilteredByCategory