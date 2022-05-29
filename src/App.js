

import { Fragment, useEffect, useState } from 'react';

import KeyBoard from './components/keyboard/keyboard';
import Pad from './components/pad/pad';
import WidgetsControl from './components/widgetsControl/widgetsControl';
import Timer from './components/timer/timer';
import  sentences from "./sentences"

import WritingPad from "./components/writingpad/writingPad"
import Beginning from './components/beginning/beginning';
import Ending from './components/ending/ending';

function App() {

  const [level,setLevel]=useState("")

  const [startGame,setStartGame]=useState(false)
  const [value,setValue]=useState("")
  const [caseOfLetters,setCaseOfLetters]=useState([])
  const [choosenSentence,setChoosenSentence]=useState("")

  const [startCountDown,setStartCountDown]=useState(false)





    useEffect(()=>{
      if(startGame){

        setValue("")
        setStartCountDown(false)
        setChoosenSentence(sentences[Math.floor(Math.random()*sentences.length)])
        setCaseOfLetters([])
        
      }

    },[startGame])



  return (

  
    <Fragment>
      {!startGame && <WidgetsControl>
          { !level && <Beginning setStartGame={setStartGame} setLevel={setLevel} />}
          { level && <Ending level={level} value={value} choosenSentence={choosenSentence} caseOfLetters={caseOfLetters} setStartGame={setStartGame} setLevel={setLevel}/>}
      
      </WidgetsControl>}

      {startGame && <WritingPad>
        <Timer level={level} startCountDown={startCountDown} setStartGame={setStartGame}/>

        <Pad 
          
          setStartGame={setStartGame} 
          choosenSentence={choosenSentence} 
          setChoosenSentence={setChoosenSentence}
          setValue={setValue} value={value} 
          caseOfLetters={caseOfLetters} setCaseOfLetters={setCaseOfLetters}
          setStartCountDown={setStartCountDown}
        />

      </WritingPad>}

      {startGame && <KeyBoard value={value}/>}

  
    </Fragment>


  );
}

export default App;
