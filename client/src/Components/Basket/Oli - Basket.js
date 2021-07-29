/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Basket = () => {
  const [basketItems, setBasketItems] = useState(null)
  useEffect(() => {
    const getBasketFromLocalStorage = () => {
      const items = JSON.parse(localStorage.getItem('truffles'))
      console.log('items in basket', items)
      setBasketItems(items)
    }
    getBasketFromLocalStorage()
  }, [])

  console.log('Incoming data >>>', basketItems)
  return (
    <>
      {basketItems && basketItems.map(item => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        )
      })}
    </>
  )
}
export default Basket 
