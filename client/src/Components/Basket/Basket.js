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

  // console.log('products >>>', products)

  // ! Adding to basket
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

  // console.log('Adding to cart >>>', cart)

  // ! Removing from cart
  const removeFromBasket = (product) => {
    const cartToRemove = cart.filter(item => item.id !== product.id)
    products.map(item => {
      if (item.id === product.id) {
        item.cart = false
      }
    })
    setCart(cartToRemove)
  }

  // console.log('Removing from cart >>>', cart)

  return (

    <>
      <h1>I am a basket</h1>

      {

        products && 

        <>

          {products.map(item => {
            return (
              <>
                <div key={item.id}>
                  <p>{item.name} - £{item.price}</p>
                  {
                    item.cart === false &&
                  <button
                    onClick={() => addToBasket(item)}
                  >
                    Add to cart
                  </button>
                  }
                  {
                    item.cart === true && 
                  <button
                    onClick={() => addToBasket(item)}
                  >
                    Added
                  </button>
                  }
                </div>

                <>

                  {
                    cart.map(itemTwo => {
                      return (
                        <div key={itemTwo.id}>
                          <button 
                            onClick={() => removeFromBasket(itemTwo)}
                          >
                          Remove
                          </button>
                        </div>
                      )
                    })
                  }
                </>
              </>

            )
          })}
          
        </>

      }

    </>


  )
}

export default Basket