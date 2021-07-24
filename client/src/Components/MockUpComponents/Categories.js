/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// The stuff in this component is later going to be inside Shop component
import FilteredByCategoryCard from './FilteredByCategoryCard'

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {

    const getData = async () => {

      setErrors(false)

      try {
        const { data } = await axios.get('/api/categories/')
        // console.log('DATA FROM CATEGORIES >>>', data[0].name)

        const categoriesNameArray = []

        data.map(item => {
          if (categoriesNameArray.indexOf(item.name) < 0) {
            categoriesNameArray.push(item)
          }
        })

        setCategories(categoriesNameArray)


      } catch (err) {
        console.log(err.message)
        setErrors(true)
      }
    }

    getData()
  }, [])

  // console.log('CATEGORIES >>>', categories[0].name)

  console.log('CATEGORIES >>>', categories)


  return (

    <>
      <h1>Categories</h1>

      {categories.length > 0 &&
        categories.map(item => {
          console.log('ITEM >>>', item)
          return (
            <h1 key={item.id}>
              <a href={`/categories/${item.id}`}>{item.name}</a>
            </h1>
          )
        })
      
      }

    </>
  )
}

export default Categories