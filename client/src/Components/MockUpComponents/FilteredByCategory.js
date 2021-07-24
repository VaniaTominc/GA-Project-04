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

        // const trufflesArray = []
        // data.map(item => {
        //   trufflesArray.push(item.truffles[1].name)

        // }) 
        
        // setTruffles(trufflesArray)

      } catch (err) {
        console.log(err.message)
        setErrors(true)
      }
    }

    getData()
  }, [id])

  const VAJA = categories.map(item => {
    return item
  }, [id])


  // console.log('TRUFFLES ARRAY >>>', truffles)
  console.log('categories >>>', categories)

  return (

    <>
      <h1>PRIKAZANA KATEGORIJA</h1>

      {categories.length > 0 &&
        categories.map(item => {
          return (
            <h1 key={item.id}>
              <h2>{item.name}</h2>
              <img src={item.images} />
              <p>{item.description}</p>
            </h1>
          )
        })
      
      }

    </>
  )
}

export default FilteredByCategory