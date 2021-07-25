import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useParams } from 'react-router-dom'

// Component showing individual product for sell

const ProductsInfoPage = () => {

  const [truffle, setTruffle] = useState([])
  // const [hasError, setHasError] = useState(false)
  // const [productComments, setProductComments] = useState([])
  // const [populateCommentOwner, setPopulateCommentOwner] = useState([])

  // const { id } = useParams()


  useEffect(() => {

    const getData = async () => {

      try {

        // const { data } = await axios.get(`/api/truffles/${id}/`)
        const { data } = await axios.get('/api/truffles/1/')
        // console.log('INCOMING DATA >>>', data)
        // console.log('OPINIONS >>>', data.opinions)               // The lenght of the opinion array

        setTruffle(data)    

        console.log('ratings >>>', data.opinions.rating)


      } catch (err) {
        // setHasError(true)
        console.log('Display Product is not working properly! >>>', err.message)
      }

    }
    getData()
  
  }, [])

  function convertAmericanDate(string) {
    return string.split('-').reverse().join('/')
  }

  return (

    <>

      { truffle ?
      
        <div>

          <h1>Product Info</h1>
          <h2>PLAYING WITH COMMENTS</h2>
      
          <p>{truffle.name}</p>

          <div>
            { truffle.opinions && 
              <div>

                {
                  truffle.opinions.map(item => {
                    return (
                      <div key={item.id}>
                        <p>{item.owner.username}</p>
                        <p>{convertAmericanDate(item.created_at.slice(11, 19))} {convertAmericanDate(item.created_at.slice(0, 10))}</p>
                        <p>{item.rating}</p>
                        <p>{item.text}</p>
                      </div>
                    )
                  })
                } 
              </div>
            }
          </div>
          
        </div>
        :
        <>
          <h1>Something has gone wrong ...</h1>
        </>
      } 

    </>

  ) 
}

export default ProductsInfoPage