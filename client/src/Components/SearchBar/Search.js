import React from 'react'
import Modal from './Modal'
import UseModal from './UseModal'

const Search = () => {
  const { isShowing, toggle } = UseModal()

  return (

    <>

      <h1>TRYING TO DISPLAY SEARCH MODAL THAT IS LATER GOING INTO A NAV BAR</h1>

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