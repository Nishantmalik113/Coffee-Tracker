import React from 'react'
import ReactDom from 'react-dom'
import { Children } from 'react'

export default function Modal(props) {
  const {children, handleCloseModal} = props
  return ReactDom.createPortal(
    <section id='Modal' className='modal-container'>
      <button onClick={handleCloseModal} className='modal-underlay' />
      <div className='modal-content'>
        {children}
      </div>

    </section>,
    document.getElementById('portal')
  )
}
