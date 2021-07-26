import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Search = () => {

  const [searchItem, setSearchItem] = useState([])
  const [filteredTruffles, setFilteredTruffles] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState('')

  useEffect(() => {

    const getData = async () => {
    
      try {

        const { data } = await axios.get('/api/truffles/')
        console.log('Incoming truffle data >>>', data)
        setSearchItem(data)

      } catch (err) {
        console.log('Something has gone wrong while processing incoming data >>>', err)
      }

    }

    getData()

  }, [])


  const filteredItem = (event) => {

    try {

      const filterProductsInArray = searchItem.filter(item => {
        return (item.name.includes(event.target.value.toUpperCase()))
      })
      setFilteredTruffles(filterProductsInArray)
      if (filterProductsInArray.length === 0) {
        setErrors('List is empty')
      }
      if (filterProductsInArray.length > 0) {
        setErrors('Something is wrong with the array')
      }

    } catch (err) {
      console.log('Something is not filtering >>>', err.message)
    }
  }

  console.log('filtered truffles >>>', filteredTruffles)


  return (

    <>

      <h1>I am a search bar</h1>

      <div>

        <input

          type='text'
          placeholder='search ...'
          onChange={filteredItem}
        />

      </div>

      <div>

        { (filteredTruffles.length > 0 ? filteredTruffles : '' ).map(item => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          )
        })
        }

      </div>





    </>

  )
}

export default Search