import React from 'react'

const ProductsCard = ( { name, price, images }) => {

  return (

    <> 
      <h4>{name}</h4>
      <p>{price}</p>
      <img src={images} alt={name} />
      <br />
      <a href=''>BASKET MOCKUP</a>
      <br />
      <a href=''>LEARN MORE</a>
    </>

  )
}

export default ProductsCard

