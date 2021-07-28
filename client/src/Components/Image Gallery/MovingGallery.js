import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import ImageShow from './ImageShow'

const MovingGallery = () => {

  const [gallery, setGallery] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/truffles/${id}`)
        setGallery(data)
      } catch (err) {
        console.log(
          'Display Product is not working properly! >>>',
          err.message
        )
      }
    }
    getData()
  }, [id])

  if (!gallery) return null

  const imageConfig = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '80px',
    focusOnSelect: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (

    <div className='container-slider'>
      {
        gallery.photos && 

          <div>
            <Slider {... imageConfig}>
              {gallery.photos.map(image => (
                <ImageShow key={image} {...image}/>
              )
              )}
            </Slider>
          </div>
      }
    </div>

  )
}

export default MovingGallery