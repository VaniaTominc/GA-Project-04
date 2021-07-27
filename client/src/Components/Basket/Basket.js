/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Basket = () => {

  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getData = async () => {

      try {
        const { data } = await axios.get('/api/truffles/')
        // console.log('Incoming DATA >>>', data)
        setProducts(data)
      } catch (err) {
        console.log('Something is wrong with the basket >>>', err.message)
      }
    }
    getData()
  }, [])

  // Adding to basket
  const addToBasket = (product) => {
    const cartToAdd = [ ...cart ]
    cartToAdd.push({ ...product })
    products.map(item => {
      if (item.id === product.id) {
        item.cart = true
      } 
    })
    setCart(cartToAdd)
  }
  
  console.log('products >>>', products)

  return (

    <>
      <h1>I am a basket</h1>

      {

        products && 

        <>

          {products.map(item => {
            return (
              <div key={item.id}>
                <p>{item.name} - £{item.price}</p>
                {
                  item.cart === false &&
                  <button>Add to cart</button>
                }
              </div>
            )
          })}
          
        </>

      }

    </>


  )
}

export default Basket