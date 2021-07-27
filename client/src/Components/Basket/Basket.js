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

  // ! Increating the quantity

  const increaseQuantity = (product) => {
    const plus = cart.map(item => {
      if (product.id === item.id) {
        // console.log('Increasing the quantity')
        item.quantity = item.quantity + 1
      }
      return item
    })
    setCart(plus)
  }

  // console.log('Increasing cart >>>', cart)

  // ! Decreasing the quantity
  const decreaseQuantity = (product) => {
    const minus = cart.map(item => {
      if (product.id === item.id && item.quantity > 1) {
        // console.log('Decreasing the quantity')
        item.quantity = item.quantity - 1
      }
      return item
    })
    setCart(minus)
  }

  // console.log('Decreasing cart >>>', cart)

  // ! Getting total

  const totalPrice = () => {
    let initialSum = 0
    cart.map(item => {
      initialSum += item.price * item.quantity
    })
    return initialSum
  }



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
                            onClick={() => increaseQuantity(item)}
                          >
                            Increase
                          </button>

                          <button 
                            onClick={() => decreaseQuantity(item)}
                          >
                            Decrease
                          </button>

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

                <>

                  <h4>TOTAL: {totalPrice()}</h4>

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