import React, { useState, useRef } from 'react'
import './GameScreen.css'

const GameScreen = ({verifyLetter,pickedWord,pickedCategory,letters,guessedLetters,wrongLetters,guesses,score}) => {


  const [letter,setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit= (e)=>{
    e.preventDefault();
    verifyLetter(letter)
    setLetter("");
    letterInputRef.current.focus();
  }

  return (

    <div className="game">
      <p className='points'>
      Points: <span>{score}</span>
      </p>

      <h1>Guess the word</h1>
      <h3 className ='tip'>Tip of the word <span>{pickedCategory}</span></h3>
      <p>You still have {guesses} tries.</p>


      <div className="wordContainer">
        {letters.map((letter,i)=>(
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (<span key={i} className="blankSquare"></span>
          )
        ))}
      </div>

      <div className="letterContainer">
        <p>Try do guess the letters</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name='letter' maxLength='1' required
          onChange={(e)=> setLetter(e.target.value)}
          value={letter}
          ref={letterInputRef}/>
          <button>Guess!</button>
        </form>

      </div>



    <div className="wrongLetterContainer">
      <p>Wrong letters already used</p>
      {wrongLetters.map((letters,i)=>(
        <span key={i}>{letters}, </span>
      ))}
    </div>
    </div>
  )
}

export default GameScreen