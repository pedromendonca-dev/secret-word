import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='Start'>
      <h2>Secret</h2>
      <h1>Wo<span className="r-letter">r</span>d</h1>
      <p>Click on the button to start playing</p>
      <button onClick={startGame}>Play</button>
    </div>
  )
}

export default StartScreen