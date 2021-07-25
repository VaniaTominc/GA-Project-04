import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductsCard from './ProductsCard'

const ShowAllProducts = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/truffles/')
      // console.log('INCOMING DATA >>>', data)
      setProducts(data)
    }
    getData()
  }, [])

  return (

    <>
      <h1>Shop</h1>

      {products.map(item => {
        return <ProductsCard key={item.id} {... item} />
      })}

    </>
  )

}

export default ShowAllProducts
