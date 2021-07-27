import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SearchFilter = () => {

  const [searchItem, setSearchItem] = useState([])
  const [filteredTruffles, setFilteredTruffles] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState('')

  const emptyArray = []

  useEffect(() => {

    const getData = async () => {
    
      try {

        const { data } = await axios.get('/api/truffles/')
        // console.log('Incoming truffle data >>>', data)
        setSearchItem(data)

      } catch (err) {
        console.log('Something has gone wrong while processing incoming data >>>', err)
      }

    }

    getData()

  }, [])

  const filteredItem = (event) => {

    try {

      const inputSearch = event.target.value
      const regexSearch = new RegExp(inputSearch, 'i')

      const filterProductsInArray = searchItem.filter(item => {
        return (regexSearch.test(item.name.toUpperCase()))
      })
      setFilteredTruffles(filterProductsInArray)
      if (filterProductsInArray.length === 0) {
        setErrors(filterProductsInArray)
      }
      if (filterProductsInArray.length > 0) {
        setErrors('Something is wrong with the array')
      }

    } catch (err) {
      console.log('Something is not filtering >>>', err.message)
    }
  }

  // console.log('filtered truffles >>>', filteredTruffles)


  

  return (

    <>

      <div>

        <input
          name='search'
          type='text'
          placeholder="What're we looking for ?"
          onKeyUp={filteredItem}
          className='search-field'
        />

      </div>

      <div>

        { (filteredTruffles.length > 0 ? filteredTruffles : emptyArray ).map(item => {
          return (
            <div key={item.id}>
              <img src={item.images} alt={item.name} />
              <a href={`/categories/product/${item.id}`}>{item.name}</a>
            </div>
          )
        })
        }

      </div>

    </>

  )
}

export default SearchFilter