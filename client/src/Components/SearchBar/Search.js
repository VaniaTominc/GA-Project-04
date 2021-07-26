import React from 'react'
import Modal from '../Modal/Modal'
import UseModal from '../Modal/UseModal'

const Search = () => {


  const { isShowing, toggle } = UseModal()


  

  return (

    <>

      <h1>TRYING TO DISPLAY SEARCH MODAL</h1>

      <div className="App">
        <button className="button-default" onClick={toggle}>Show Modal</button>
        <Modal
          isShowing={isShowing}
          hide={toggle}
        />
      </div>


    </>

  )
}

export default Search