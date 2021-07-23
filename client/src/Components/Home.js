import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  const [truffles, setTruffles] = useState([])
  // const [errors, setErrors] = useState(false)

  useEffect(() => {

    const getData = async () => {
      // setErrors(true)
      
      try {

        const { data } = await axios.get('/api/truffles/')
        setTruffles(data)
        console.log('DATA >>>', data)

      } catch (err) {
        // setErrors(true)
        console.log(err.message)
      }
    }

    getData()

  }, [])

  return (
    <>
    
      <div>
        {truffles.map(item => 
          <h1 key={item.id}>
            {item.name}
          </h1>)}
      </div>

    </>

  )

}

export default Home