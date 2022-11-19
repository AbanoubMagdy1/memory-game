import React, { useEffect, useRef, useState } from 'react'
import { createGameGrid } from '../../utils'
import Card from '../Card/Card'
import Navbar from '../Navbar/Navbar'
import useArray from '../../customHooks/useArray'
import useToggle from '../../customHooks/useToggle'
import './Game.scss'
import Modal from '../Modal/Modal'

function Game () {
  const [cards, setCards] = useState(createGameGrid())
  const { arr: temporary, push: pushTemporary, clear: clearTemporary } = useArray([])
  const { arr: permanent, push: pushPermanent, clear: clearPermanent } = useArray([])
  const [isOpen, toggle] = useToggle(false)
  const trials = useRef(0)

  useEffect(function handleMatching () {
    if (temporary.length === 2) {
      trials.value++
      setTimeout(() => {
        console.log(temporary)
        if (temporary[0].value === temporary[1].value) {
          pushPermanent(...temporary)
        }
        clearTemporary()
      }, 1000)
    }
  }, [temporary])

  function onCardClick (card) {
    if (temporary.length === 2) return
    pushTemporary(card)
  }

  function restart () {
    setCards(createGameGrid())
    clearPermanent([])
    clearTemporary([])
  }

  function isFlipped (card) {
    return temporary.some(c => c === card) || permanent.some(c => c === card)
  }

  function isRemoved (card) {
    return permanent.some(c => c === card)
  }

  return (<>
    <Navbar restart={restart}/>
    <Modal isOpen={isOpen} toggle={toggle}></Modal>
    <div className="game">
      <h1>Memory Game</h1>
      {cards.map((row, rowIdx) => (
        <div className="game__row" key={rowIdx}>
          {row.map((card, colIdx) => (<Card
            key={card.id}
            card={card}
            isFlipped={isFlipped(card)}
            isRemoved={isRemoved(card)}
            flipCard={onCardClick}
          />))}
        </div>
      ))}
    </div>
  </>

  )
}

export default Game
