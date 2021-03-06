import React from 'react'
import ReactDOM from 'react-dom'
import SearchFilter from './SearchFilter'

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(


  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal-visible-custom">
        <div className="modal-header-custom">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <SearchFilter />
      </div>
    </div>

    
  </React.Fragment>, document.body
) : null

export default Modal