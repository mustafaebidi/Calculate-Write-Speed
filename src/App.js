

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
  const [storeAverageSpeedPerMinute,setStoreAverageSpeedPerMinute]=useState([])





    useEffect(()=>{
      if(startGame){

        setValue("")
        setStartCountDown(false)
        console.log(Math.random()*sentences.length)
        setChoosenSentence(sentences[Math.floor(Math.random()*sentences.length)])
        setCaseOfLetters([])
        setStoreAverageSpeedPerMinute([])
        
      }

    },[startGame])



  return (

  
    <Fragment>
      {!startGame && <WidgetsControl>
          { !level && <Beginning setStartGame={setStartGame} setLevel={setLevel} />}
          { level && <Ending storeAverageSpeedPerMinute={storeAverageSpeedPerMinute} level={level} value={value} choosenSentence={choosenSentence} caseOfLetters={caseOfLetters} setStartGame={setStartGame} setLevel={setLevel}/>}

      </WidgetsControl>}

      {startGame && 
        <div className='laptop'>

          <WritingPad>
      
            <Timer level={level} startCountDown={startCountDown} setStartGame={setStartGame} value={value} setStoreAverageSpeedPerMinute={setStoreAverageSpeedPerMinute}/>

            <Pad 
              setStartGame={setStartGame} 
              choosenSentence={choosenSentence} 
              setChoosenSentence={setChoosenSentence}
              setValue={setValue} value={value} 
              setStartCountDown={setStartCountDown}
              setStoreAverageSpeedPerMinute={setStoreAverageSpeedPerMinute}
            />

          </WritingPad>

          <KeyBoard value={value}/>

        </div>

      }


  
    </Fragment>


  );
}

export default App;
