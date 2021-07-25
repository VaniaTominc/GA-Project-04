/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const FilteredByCategory = () => {

  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState(false)

  const { id } = useParams()

  useEffect(() => {

    const getData = async () => {

      setErrors(false)

      try {
        // const { data } = await axios.get('/api/categories/2/')
        const { data } = await axios.get(`/api/categories/${id}`)
        // console.log('DATA FROM CATEGORIES >>>', data[1].truffles[0])

        setCategories(data.truffles)

      } catch (err) {
        console.log(err.message)
        setErrors(true)
      }
    }

    getData()
  }, [id])

  return (

    <>
      { categories ? 
        <>
          <h1>PRIKAZANA KATEGORIJA</h1>

          <div>

            {categories &&
              categories.map(item => {
                return (
                  <div className='product-card-border' key={item.id}>
                    <h3>{item.name}</h3>
                    <p>RATING</p>
                    <img src={item.images} alt={item.name}/>
                    <p>{item.price}</p>
                    <a href={`/categories/product/${item.id}`}>SHOW MORE</a>
                    <p>BASKET</p>
                  </div>
                )
              })
            }

          </div>
        </>
        :
        <>
          <h1>Something has gone wrong ...</h1>
        </>
          
      }

    </>
  )
}

export default FilteredByCategory