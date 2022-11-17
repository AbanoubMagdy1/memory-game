import React from 'react'
import './Navbar.scss'
import propTypes from 'prop-types'

function Navbar ({ restart }) {
  return (
    <div className="navbar">
        <div className="navbar__container">
            <div className="left"></div>
            <div className="right">
                <button className="btn btn-restart" onClick={restart}>Restart</button>
            </div>
        </div>
    </div>
  )
}

Navbar.propTypes = {
  restart: propTypes.func.isRequired
}

export default Navbar
