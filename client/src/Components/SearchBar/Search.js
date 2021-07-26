import React from 'react'
import Modal from './Modal'
import UseModal from './UseModal'
import { FaBeer } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'

const Search = () => {
  const { isShowing, toggle } = UseModal()

  return (

    <>

      <h1>TRYING TO DISPLAY SEARCH MODAL THAT IS LATER GOING INTO A NAV BAR</h1>
      <FaBeer />

      <div className="App">
        <button className="button-default" onClick={toggle}><BsSearch size={30} /></button>
        <Modal
          isShowing={isShowing}
          hide={toggle}
        />
      </div>


    </>

  )
}

export default Search