/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// The stuff in this component is later going to be inside Shop component
import CategoriesCard from './CategoriesCard'

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {

    const getData = async () => {

      setErrors(false)

      try {
        const { data } = await axios.get('/api/categories/')
        // console.log('DATA FROM CATEGORIES >>>', data)
        setCategories(data)

      } catch (err) {
        console.log(err.message)
        setErrors(true)
      }
    }

    getData()
  }, [])

  // console.log('CATEGORIES >>>', categories[0].name)

  return (

    <>
      <h1>Categories</h1>

      {categories.map(item => {
        return < CategoriesCard key={item.id} { ... item } />
      })}
    </>
  )
}

export default Categories