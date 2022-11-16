import React, { memo } from 'react'
import clsx from 'clsx';
import './Card.scss'

function Card({card, isFlipped, flipCard}) {
  function flip(){
    flipCard(card)
  }

  return (
    <div className={clsx('card', isFlipped && 'isFlipped')}>
        <div className="card__front" onClick={flip}></div>
        <div className="card__back">{card.value}</div>
    </div>
  )
}

export default memo(Card)