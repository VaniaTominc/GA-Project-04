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
      <h1>PRIKAZANA KATEGORIJA</h1>

      {categories.length > 0 &&
        categories.map(item => {
          return (
            <h2 key={item.id}>
              <h3>{item.name}</h3>
              <img src={item.images} />
              <p>{item.description}</p>
            </h2>
          )
        })
      
      }

    </>
  )
}

export default FilteredByCategory