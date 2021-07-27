import React from 'react'
import Modal from './Modal'
import UseModal from './UseModal'
import { BsSearch } from 'react-icons/bs'

const Search = () => {
  const { isShowing, toggle } = UseModal()

  return (

    <>

      <div>
        <button className='button-default' onClick={toggle}><BsSearch size={30} /></button>
        <Modal
          isShowing={isShowing}
          hide={toggle}
        />
      </div>


    </>

  )
}

export default Search