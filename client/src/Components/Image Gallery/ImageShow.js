import React from 'react'

const ImageShow = ( { imageurl } ) => {
  
  return (
    <div>
      <span> 
        {/* <img src={images} /> */}
        <img src={imageurl} />
          
      </span>
    </div>
  )
}

export default ImageShow