import React from 'react'
import './EndScreen'

const EndScreen = ({retryGame}) => {
  return (
    <div>
      <h1>GameOver</h1>
      <button onClick={retryGame}>Retry</button>
    </div>
    
  )
}

export default EndScreen