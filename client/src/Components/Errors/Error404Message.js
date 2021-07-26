import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const Error404Message = () => {

  return (

    <>
    
      <div className='mailbox'>
        <div className='err'>4</div>
        <i>< FaSpinner className='where'/></i>
        <div className='err2'>4</div>
        <div className='msg'>
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
          <p>Let`s go <a href="#">home</a> and try from there.</p>
        </div>
      </div>
    
    </>
  )
}

export default Error404Message