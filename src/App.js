// Csss
import './App.css';
// React
import { useCallback, useEffect, useState} from 'react';
// constants
import { wordsList } from './data/words';
import { stages } from './data/stages';
// components
import StartScreen from './components/StartScreen/StartScreen';
import GameScreen from './components/GameScreen/GameScreen';
import EndScreen from './components/EndScreen/EndScreen';


function App() {
  const [gameStage, setGameStage] =useState(stages[0].name);
  const [words] =useState(wordsList)

  const[pickedWord,setPickedWord] = useState("")
  const[pickedCategory, setPickedCategory] = useState("")
  const[letters, setLetter] = useState([])

  const[guessedLetters, setGuessedLetters] = useState([])
  const[wrongLetters, setWrongLetters] =useState ([])
  const[guesses,setGuesses] = useState(3)
  const[score,setScore] = useState (0)




  const pickWordandCategory = () =>{
    const categories = Object.keys(words)
    const category = 
    categories[Math.floor(Math.random()* Object.keys(categories).length)]

    console.log(category)


    const word = 
    words[category][Math.floor(Math.random()*words[category].length)]


    return {word,category}

  }

//functions to starts, game or end
  const startGame = () => {
    const {word, category} = pickWordandCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l)=>l.toLowerCase());

    //filtrando os states
    setPickedWord(word)
    setPickedCategory(category)

    setLetter(wordLetters)


    setGameStage (stages[1].name)
  }

  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }


    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[...actualGuessedLetters,normalizedLetter,]);
    }else{
      setWrongLetters((actualWrongLetters)=>[...actualWrongLetters,normalizedLetter,]);
    }




  

  }

  console.log(guessedLetters);
  console.log(wrongLetters);
  const retryGame = () => {
    setGameStage(stages[0].name)
  }


  return (
    <div className="App">

     {gameStage === 'start' && <StartScreen startGame={startGame}/>}

     {gameStage === 'game'&& <GameScreen 
     verifyLetter={verifyLetter} 
     pickedWord={pickedWord} 
     pickedCategory={pickedCategory} 
     letters={letters}
     guessedLetters={guessedLetters}
     wrongLetters={wrongLetters}
     guesses={guesses}
     score={score}
     />}

     {gameStage === 'end'&& <EndScreen retryGame={retryGame}/>}

    </div>
  );
}

export default App;
