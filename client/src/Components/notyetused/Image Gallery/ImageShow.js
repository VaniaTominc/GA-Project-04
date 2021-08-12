import React from 'react'

const ImageShow = ( { imageurl } ) => {
  
  return (
    <div>
      <span> 
        {/* <img src={images} /> */}
        <img src={imageurl} className='sliding-gallery-margin'/>
          
      </span>
    </div>
  )
}

export default ImageShow