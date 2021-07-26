import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'

const SearchResults = () => {

  const [searchItem, setSearchItem] = useState([])
  // const [errors, setErrors] = useState('')

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

  const filterProducts = (products, query) => {
    if (!query) {
      return products
    }

    return products.filter(item => {
      const productName = item.name.toLowerCase()
      return productName.includes(query)
    })
  }

  const { search } = window.location
  const query = new URLSearchParams(search).get('result')
  const [searchQuery, setSearchQuery] = useState(query || '')
  const filteredProducts = filterProducts(searchItem, searchQuery)

  return (

    <>

      <h1>What is happening?</h1>

      <div>
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ul>
          {filteredProducts.map(item => {
            <li key={item.id}>{item.name}</li>
          })}
        </ul>

      </div>

    </>

  )


}

export default SearchResults