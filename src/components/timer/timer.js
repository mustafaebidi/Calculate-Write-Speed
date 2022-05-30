import { useEffect, useState ,useRef} from "react"

import "./timer.css"

const Timer=({level,setStartGame,startCountDown,setStoreAverageSpeedPerMinute,value})=>{

    const[timer,setTimer]=useState(60)
    const typeLevel=useRef({easy:5,medium:3,hard:1})

    const globalTimer=useRef("")



    useEffect(()=>{
        if(timer === 0){
            clearInterval(globalTimer.current)
            setStartGame(false)
            setStoreAverageSpeedPerMinute((state)=>([...state,value.length]))

        }

        if( timer > 60 && ((timer-1) % 60) === 0  ){
            console.log(value.length)
            setStoreAverageSpeedPerMinute((state)=>[...state,value.length])
            
        }


    },[timer,setStartGame,setStoreAverageSpeedPerMinute,value])



    useEffect(()=>{


        setTimer(typeLevel.current[level]*60)



        if(startCountDown){
            globalTimer.current=setInterval(() => {
                setTimer((state)=>state-1)
            }, 1000);

        }




        return(()=>{
            clearInterval(globalTimer.current)
            
        })
        
    },[level,startCountDown])



    return(
        
        <div className="timer">
            <h2>Remaining Time</h2>
            <div className="inner">
                <svg>
                    <circle style={{strokeDashoffset:`${( ((typeLevel.current[level]*60) - timer) / (typeLevel.current[level]*60) ) * 441 }`}} cx="70" cy="70" r="70"></circle>
                </svg>
                <div className="count-down"><span>{parseInt(timer/60) ? `${parseInt(timer/60)} ` :""}</span><span>{timer%60 ?timer%60 : timer === 0 ?"0":"00" }</span></div>
            </div>

        </div>


    )

}

export default Timer



