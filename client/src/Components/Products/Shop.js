import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Error404Message from '../Errors/Error404Message'

const Shop = () => {

  const [categories, setCategories] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {

    const getData = async () => {

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
        setHasError(true)
      }
    }

    getData()
  }, [])


  return (

    <>
      
      { categories ?
      
        <>

          <h1>Categories</h1>

          {categories.length > 0 &&
            categories.map(item => {
              return (
                <h1 key={item.id}>
                  <a href={`/categories/${item.id}`}>{item.name}</a>
                </h1>
              )
            })
          }

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

export default Shop