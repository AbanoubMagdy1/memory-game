import React, { useEffect, useRef, useState } from 'react'
import { createGameGrid } from '../../utils'
import Card from '../Card/Card'
import Navbar from '../Navbar/Navbar'
import useArray from '../../customHooks/useArray'
import useToggle from '../../customHooks/useToggle'
import './Game.scss'
import Modal from '../Modal/Modal'

const dimension = 4

function Game () {
  const [cards, setCards] = useState(createGameGrid(dimension))
  const [isShown, toggleShown] = useToggle(false)
  const { arr: temporary, push: pushTemporary, clear: clearTemporary } = useArray([])
  const { arr: permanent, push: pushPermanent, clear: clearPermanent } = useArray([])
  const [isOpen, toggleOpen] = useToggle(false)
  const trials = useRef(0)

  useEffect(function handleMatching () {
    if (temporary.length === 2) {
      trials.current++
      setTimeout(() => {
        if (temporary[0].value === temporary[1].value) {
          pushPermanent(...temporary)
        }
        clearTemporary()
      }, 1000)
    }
  }, [temporary])

  useEffect(function handleWin () {
    if (permanent.length === dimension * dimension) {
      toggleOpen()
    }
  }, [permanent])

  function onCardClick (card) {
    if (temporary.length === 2) return
    pushTemporary(card)
  }

  function restart () {
    setCards(createGameGrid())
    clearPermanent([])
    clearTemporary([])
    trials.current = 0
  }

  function isFlipped (card) {
    return isShown || temporary.some(c => c === card) || permanent.some(c => c === card)
  }

  function isRemoved (card) {
    return permanent.some(c => c === card)
  }

  function restartAndClose () {
    restart()
    toggleOpen()
  }

  return (<>
    <Navbar restart={restart}/>

    <Modal isOpen={isOpen} toggle={toggleOpen}>
      <h2 style={{ marginBottom: '.5rem' }}>
        You finished after {trials.current} trials.
      </h2>
      <button onClick={restartAndClose} >Restart</button>
    </Modal>

    <div className="game">
      <h1>Memory Game</h1>

      <div className='game__show-btn'>
        <button onClick={toggleShown} disabled={trials.current > 0 || temporary.length}>
          {isShown === true ? 'Hide' : 'Show' } Cards
        </button>
      </div>

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
