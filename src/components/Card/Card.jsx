import React, { memo } from 'react'
import clsx from 'clsx'
import propTypes from 'prop-types'
import './Card.scss'

function Card ({ card, isFlipped, flipCard }) {
  function flip () {
    flipCard(card)
  }

  return (
    <div className={clsx('card', isFlipped && 'isFlipped')}>
        <div className="card__front" onClick={flip}></div>
        <div className="card__back" style={{ backgroundImage: `url(${card.value})` }}>
        </div>
    </div>
  )
}

Card.propTypes = {
  card: propTypes.object.isRequired,
  isFlipped: propTypes.bool.isRequired,
  flipCard: propTypes.func.isRequired
}

export default memo(Card)
