import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const Home = () => {


  return (
    <div className='home-page-outer-body'>

      <Carousel fade id='coursel-background'>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/pxqqLrg/Trufflue1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/HgZcSwg/Truffle1-1.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/pxqqLrg/Trufflue1.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className='home-page-card'>
        <div className='home-text-container'>
          <h1>
            <span className='truffluxry-heading'>Truff<span className='logo-nav'>·l·</span>uxury</span>,
          </h1>
          <h1 className='truffluxry-second-heading'>
            <span>your specialied shop for </span>
            <span>THE Istrian truffles</span>
          </h1>
        </div>
      </div>

      <section className='explore-more-home-page'>

        <div className='general-button-2'>
          <a href='/shop'>
            <input 
              type='submit' 
              value='Explore more'
            />
          </a>
        </div>

      </section>


    </div>

  )

}

export default Home