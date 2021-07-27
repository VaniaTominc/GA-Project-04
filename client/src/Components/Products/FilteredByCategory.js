import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Error404Message from '../Errors/Error404Message'

const FilteredByCategory = () => {

  const [categories, setCategories] = useState([])
  const [hasError, setHasError] = useState(false)

  const { id } = useParams()

  useEffect(() => {

    const getData = async () => {

      try {
        // const { data } = await axios.get('/api/categories/2/')
        const { data } = await axios.get(`/api/categories/${id}`)
        // console.log('DATA FROM CATEGORIES >>>', data[1].truffles[0])

        setCategories(data.truffles)

      } catch (err) {
        console.log(err.message)
        setHasError(true)
      }
    }

    getData()
  }, [id])

  return (

    <>
      { categories ? 
      
        { categories }

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