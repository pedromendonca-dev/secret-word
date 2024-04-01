import React from 'react'
import './EndScreen.css'

const EndScreen = ({retryGame, score}) => {
  return (
    <div className='endGameContainer'>
      <h1 className='endGameTitle'>GameOver</h1>
      <h2>
        Your score was: <span>{score}</span>
      </h2>
      <button onClick={retryGame}>Retry</button>
    </div>
    
  )
}

export default EndScreen