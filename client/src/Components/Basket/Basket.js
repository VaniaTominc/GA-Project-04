/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Basket = () => {

  const [basketItems, setBasketItems] = useState(null)
  const [updatedBasket, setUpdatedBasket] = useState([])

  useEffect(() => {
    const getBasketFromLocalStorage = () => {
      const items = JSON.parse(localStorage.getItem('test'))
      console.log('items in basket', items.price)
      setBasketItems(items)
      setUpdatedBasket(items)
    }
    getBasketFromLocalStorage()

  }, [])


  // ! Adding to basket
  // const addToBasket = (product) => {
  //   const cartToAdd = [ ...cart ]
  //   cartToAdd.push({ ...product })
  //   products.map(item => {
  //     if (item.id === product.id) {
  //       item.cart = true
  //       console.log('Adding to cart >>>', cart)
  //       return localStorage.setItem('productIds', JSON.stringify(item))
  //     } 
  //   })
  //   setCart(cartToAdd)
  // }


  // ! Removing from basket
  const removeFromBasket = (product) => {
    const cartToRemove = basketItems.filter(item => item.id !== product.id)
    basketItems.map(item => {
      if (item.id === product.id) {
        item.updatedBasket = false
        console.log('Removing from cart >>>', cartToRemove)
      }
    })
    setBasketItems(cartToRemove)
  }


  // console.log('Removing from cart >>>', cart)

  // ! Increating the quantity

  const increaseQuantity = (product) => {
    const plus = basketItems.map(item => {
      if (product.id === item.id) {
        console.log('Increasing the quantity')
        item.qty = item.qty + 1
      }
      return item
    })
    setBasketItems(plus)
  }

  console.log('Increasing cart >>>', updatedBasket)

  // ! Decreasing the quantity
  const decreaseQuantity = (product) => {
    const minus = basketItems.map(item => {
      if (product.id === item.id && item.qty > 1) {
        console.log('Decreasing the quantity')
        item.qty = item.qty - 1
      }
      return item
    })
    setBasketItems(minus)
  }

  // console.log('Decreasing cart >>>', updatedBasket)

  // ! Getting total

  const totalPrice = () => {
    let initialSum = 0
    updatedBasket.map(item => {
      initialSum += item.price * item.quantity
    })
    return initialSum
  }



 

  return (

    <div>

      {/* {basketItems && basketItems.map(item => {
        return (
          <h1 key={item.id}>{item.name}</h1>
        )
      })} */}

      <div>
        {basketItems && basketItems.map(item => {

          return (
            <div key={item.id}>
              <div>
              </div>
            </div>

          )
        })}

      </div>

      <div>
        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {
              basketItems && basketItems.map((i, index) => {
                return (

                  < tr key={i.id}>
                    <th scope='row'>{index + 1}</th>
                    <th scope='row'>
                    </th>
                    <td>{i.name}</td>
                    <td>
                      {i.price}
                    </td>
                    <td>

                      <button
                        onClick={() => decreaseQuantity(i)}
                      >
                      -
                      </button>

                      {i.quantity}

                      <button
                        onClick={() => increaseQuantity(i)}
                      >
                      +
                      </button>
                      
                    </td>

                    <td>
                      <button onClick={() => removeFromBasket(i)}>
                      Remove
                      </button>
                    </td >
                  </tr >
                
                )
              })
            }
          </tbody>

        </table>
      </div>

      <div>

        <h4>TOTAL: £{totalPrice()}</h4>

      </div>

    </div >
  )


  
}

export default Basket