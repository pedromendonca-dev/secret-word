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

const guessesQnty = 3;

function App() {
  const [gameStage, setGameStage] =useState(stages[0].name);
  const [words] =useState(wordsList)

  const[pickedWord,setPickedWord] = useState("")
  const[pickedCategory, setPickedCategory] = useState("")
  const[letters, setLetter] = useState([])

  const[guessedLetters, setGuessedLetters] = useState([])
  const[wrongLetters, setWrongLetters] =useState ([])
  const[guesses,setGuesses] = useState(guessesQnty)
  const[score,setScore] = useState (0)

  



  const pickWordandCategory = useCallback(() =>{
    const categories = Object.keys(words)
    const category = 
    categories[Math.floor(Math.random()* Object.keys(categories).length)]

    console.log(category)


    const word = 
    words[category][Math.floor(Math.random()*words[category].length)]


    return {word,category}

  },[words])

//functions to starts, game or end
  const startGame = useCallback (() => {
    const {word, category} = pickWordandCategory();

    clearLetterStates();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l)=>l.toLowerCase());

    //filtrando os states
    setPickedWord(word)
    setPickedCategory(category)

    setLetter(wordLetters)


    setGameStage (stages[1].name)
  
  },[pickWordandCategory])

  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      alert('Letter already used')
      return;
    }


    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[...actualGuessedLetters,normalizedLetter,]);
    }else{
      setWrongLetters((actualWrongLetters)=>[...actualWrongLetters,normalizedLetter,]);
      setGuesses((actualGuessed) => actualGuessed - 1);
    }
    

  }

  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }


  useEffect (() =>{

    
    if(guesses <=0) {

      clearLetterStates();
      setGameStage(stages[2].name)
    }
  
  }, [guesses])


  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)]


    if (guessedLetters.length === uniqueLetters.length){
      setScore((actualScore)=> actualScore + 100)

      startGame();
    }

  },[guessedLetters,letters,startGame])


  const retryGame = () => {
    setScore(0);
    setGuesses(guessesQnty);
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

     {gameStage === 'end'&& <EndScreen retryGame={retryGame} score={score}/>}

    </div>
  );
}

export default App;
