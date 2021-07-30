import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Error404Message from '../Errors/Error404Message'
// import Slider from 'react-slick'


const Shop = () => {

  const [categories, setCategories] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {

    const getData = async () => {

      try {
        const { data } = await axios.get('/api/categories/')
        // console.log('DATA FROM CATEGORIES >>>', data[0].name)

        const categoriesNameArray = []

        data.map(item => {
          if (categoriesNameArray.indexOf(item.name) < 0) {
            categoriesNameArray.push(item)
          }
        })

        setCategories(categoriesNameArray)


      } catch (err) {
        console.log(err.message)
        setHasError(true)
      }
    }

    getData()
  }, [])

  // const categoryConfig = {
  //   dots: true,
  //   infinite: true,
  //   speed: 3000,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   focusOnSelect: true,
  //   autoplay: true,
  //   autoplaySpeed: 50,
  // }

  return (

    <div className='pushing-content-down'>
      
      { categories ?
      
        <>

          <div className='shop-top-margin'>
            <div className='shop-top-description'>
              <h1 className='shop-heading-1'>Chose from many categories we have</h1>
              <h3 className='shop-heading-3'>At Truff<span className='logo-nav'>·l·</span>uxury we take the utmost care at selecting <span className='logo-nav'>THE BEST</span> and we provide products from reputable local Istrian providers!</h3>
            </div>
          </div>

          <div className='outside-shop-container'>

            {/* // <h1 key={item.id}>
                //   <a href={`/categories/${item.id}`}>{item.name}</a>
                // </h1> */}

            { categories.length > 0 &&

            // <div className='sliding-gallery-container shop-slider'>
              <div className='sorting-shop-category'>
                {/* <Slider {... categoryConfig}> */}

                

                {
                  categories && categories.map(item => {
                    return (
                      
                      <div key={item.id} className='container-shop-display'>
                        <a href={`/categories/${item.id}`} className='removing-a-underline'>
                          <div className='card-shop-display card0-expanded' style={{
                            backgroundImage: `url(${item.image})`,
                          }}>
                            <div className='border-shop-display'>
                              <h2 className='shop-card-text'>{item.longname}</h2>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  })
                }

            
                
                {/* </Slider> */}
              </div>
            }
          </div>
        </>

        :

        hasError ?

          <Error404Message />

          :

          <>

            <img src='https://thumbs.gfycat.com/BareJoyousAsp.webp' alt='Rick And Morty'/>
            
          </>

      }

    </div>
  )
}

export default Shop