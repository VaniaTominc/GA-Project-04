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
        console.log('Adding to cart >>>', cart)
        return localStorage.setItem('productIds', JSON.stringify(item))
      } 
    })
    setCart(cartToAdd)
  }

  const WorkingCart = cart.map(item => {
    const retriveData = localStorage.getItem('productIds')
    return retriveData
  })
  
  
  console.log('working cart? >>>', WorkingCart)


  localStorage.setItem('working', JSON.stringify(WorkingCart))

  const WorkingCartData = localStorage.getItem('working')
  const DemistifiedCartData = JSON.parse(WorkingCartData)

  // alert(DemistifiedCartData.length)

  // console.log('Adding to cart >>>', cart)

  // ! Removing from basket
  const removeFromBasket = (product) => {
    const cartToRemove = cart.filter(item => item.id !== product.id)
    products.map(item => {
      if (item.id === product.id) {
        item.cart = false
        console.log('Removing from cart >>>', cart)
      }
    })
    setCart(cartToRemove)
  }

  // console.log('Removing from cart >>>', cart)

  // ! Increating the quantity

  const increaseQuantity = (product) => {
    const plus = cart.map(item => {
      if (product.id === item.id) {
        console.log('Increasing the quantity')
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
        console.log('Decreasing the quantity')
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

    <div>
      <div>
        {products.map(item => {

          return (
            <div key={item.id}>
              <div>

                <div>

                  <h6>
                    {item.name} - £{item.price}
                  </h6>

                  {
                    item.cart === false
                  &&
                  <button 
                    onClick={() => addToBasket(item)}
                  >
                    Add to cart
                  </button>
                  }

                  {
                    item.cart === true
                  &&
                  <button 
                    onClick={() => addToBasket(item)}
                  >
                    Added
                  </button>
                  }
                </div>
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
              cart.map((i, index) => {
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

        <h4>TOTAL: {totalPrice()}</h4>

      </div>

    </div >
  )


  
}

export default Basket