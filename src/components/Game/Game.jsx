import React, { useEffect, useState } from 'react'
import { createGameGrid } from '../../utils'
import Card from '../Card/Card'
import "./Game.scss"

function Game() {
  const [cards, setCards] = React.useState(createGameGrid());
  const [temporary, setTemporary] = useState([]);
  const [permanent, setPermanent] = useState([])  

  useEffect(function handleMatching(){
    if(temporary.length == 2){
      setTimeout(() => {
        if(temporary[0].value === temporary[1].value){
           setPermanent([...permanent, ...temporary]) 
        } 
        setTemporary([])
      }, 1000)
    }
  }, [temporary])

  function onCardClick(card) {
    if (temporary.length === 2) return;
    setTemporary([...temporary, card])
  }

  function isFlipped(card){
    return temporary.some(c => c === card) || permanent.some(c => c === card)
  }

  return (
    <div className="game">
      {cards.map((row, rowIdx) => (
        <div className="game__row" key={rowIdx}>
          {row.map((card, colIdx) => (<Card 
            key={card.id}
            card={card}
            isFlipped={isFlipped(card)}
            flipCard={onCardClick}
          />))}
        </div>
      ))}
    </div>
  )
}

export default Game