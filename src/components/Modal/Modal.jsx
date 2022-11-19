import React from 'react'
import clsx from 'clsx'
import propTypes from 'prop-types'
import './Modal.scss'

function Modal ({ children, isOpen, toggle, width }) {
  return (
    <div className={clsx('modal', isOpen && 'open')}>
        <div className="modal__body" style={{ width }}>
            <button className="btn-close" onClick={toggle}>X</button>
            {children}
        </div>
    </div>
  )
}

Modal.propTypes = {
  children: propTypes.node,
  isOpen: propTypes.bool,
  toggle: propTypes.func,
  width: propTypes.number
}

Modal.defaultProps = {
  width: 400,
  isOpen: false
}

export default Modal
