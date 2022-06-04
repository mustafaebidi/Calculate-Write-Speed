
import {memo, useCallback, useEffect, useRef, useState} from "react"
import "./pad.css"


const Pad=({value,setValue,setStartGame,choosenSentence,setStartCountDown,setStoreAverageSpeedPerMinute})=>{

    const [current,setCurrent]=useState(0)

    const globalTimer=useRef()

    const firstTime=useRef(true)

    const values=useRef(null)

    const storeLastPos=useRef(0)

    const padElement=useRef(null)

    const prevCurrent=useRef(true)

    const [visualView,setVisualView]=useState(0)



    const goToTop=(scrollRate,lastPos)=>{

        let scrollTo=lastPos;

        globalTimer.current=setInterval(() => {

            padElement.current.scrollTop=scrollTo

            if(scrollTo < (scrollRate+lastPos) ){
                clearInterval(globalTimer.current)
            }

            scrollTo=scrollTo-1

            
        },9);

    }

    const goToDown=(scrollRate,lastPos)=>{

        let scrollTo=lastPos;


        globalTimer.current=setInterval(() => {

            padElement.current.scrollTop=scrollTo

            if(scrollTo > (scrollRate+lastPos)){

                clearInterval(globalTimer.current)
            }
            scrollTo+=1
            

        },9);
        
    }

    const scrollWithAnimatin=useCallback((scrollRate)=>{

        clearInterval(globalTimer.current)

        ///old pos
        let tempPos=storeLastPos.current
        ////new pos
        storeLastPos.current=storeLastPos.current+scrollRate



        if(scrollRate>0){
            goToDown(scrollRate,tempPos)

        }
        else{
            goToTop(scrollRate,tempPos)

        }
    },[])

    const handleChange=()=>{

        values.current.focus()

        ///run at The First time only To Fire Timer
        if(firstTime.current){
            firstTime.current=false
            setStartCountDown(true)
        }

        setValue(values.current.value)

        setCurrent(()=>values.current.value.length ? values.current.value.length :0)
        prevCurrent.current=current


        if(values.current.value.length === choosenSentence.length){
            setStoreAverageSpeedPerMinute((state)=>[...state,value.length])
            setStartGame(false)
        }

    }



    const checkScrollToDown=useCallback((allWord)=>{

        if(current > prevCurrent.current && allWord[current].offsetTop > allWord[current-1].offsetTop){
            return true
        }
        return false


    },[current])

    const checkScrollToTop=useCallback((allWord)=>{

        if(current < prevCurrent.current && allWord[prevCurrent.current].offsetTop > allWord[current].offsetTop){
            return true
        }
        return false


    },[current])

    const checkHaveToScroll=useCallback(()=>{


        const allWord=document.querySelectorAll(".letter")

        let letter=document.querySelector(".letter")

        let maginInLetter= window.getComputedStyle(letter).marginTop

        maginInLetter=+maginInLetter.replace("px","")

        let letterHeight=letter.offsetHeight

        let ItemSize=letterHeight+(maginInLetter*2)

        

        if((allWord[choosenSentence.length-1].offsetTop - allWord[current].offsetTop)+ ItemSize < visualView ){
            return false;

        }

        return true;



    },[choosenSentence, current, visualView])

    const getHeightOVisualView=()=>{

        const allWord=document.querySelectorAll(".letter")


        let veiwPort=300

        let lastLetter=((allWord[allWord.length-1].offsetTop+allWord[allWord.length-1].offsetHeight)+8)

        for(let i=0;i<allWord.length-1;i++){

            if(((allWord[i].offsetTop+allWord[i].offsetHeight)+8) > veiwPort ){
                return ((allWord[i-1].offsetTop+allWord[i-1].offsetHeight)+8)

            }
            

        }
        return lastLetter

    }

    useEffect(()=>{

        
        if(choosenSentence){

            setVisualView(getHeightOVisualView())
        }

    },[choosenSentence])




    useEffect(()=>{

        if(current){

            let letter=document.querySelector(".letter")

            let maginInLetter= window.getComputedStyle(letter).marginTop
    
            maginInLetter=+maginInLetter.replace("px","")
    
            let letterHeight=letter.offsetHeight
    
            let amountOfScroll=letterHeight+(maginInLetter*2)
    
    
            const allWord=document.querySelectorAll(".letter")

            if(checkHaveToScroll()){

                if(checkScrollToDown(allWord)){
                    scrollWithAnimatin(amountOfScroll)
                }
        
                else if(checkScrollToTop(allWord)){
                    scrollWithAnimatin(-amountOfScroll)
                }

            }
        }
        else
        {
            
            (padElement.current ? scrollWithAnimatin(-storeLastPos.current) : padElement.current=null)
        }

    },[value, current, scrollWithAnimatin, checkHaveToScroll, checkScrollToDown, checkScrollToTop, choosenSentence])




    if(choosenSentence){

        let numberOfLetters=0;
        return(
            <div ref={padElement} style={{maxHeight: `${visualView ? `${visualView}px` :'310px'}`}} className="pad">
                <input id="main" ref={values} autoComplete="off" onChange={()=>handleChange()} value={value} onPaste={(e)=> {
                    e.preventDefault()
                    return false;
                }} />   

                <div className="words-container">
                        {choosenSentence.split(" ").map((word,index)=>{
                            let newWord=word.concat(" ")

                            return(
                                    <Words key={index} index={index} >
                                        {newWord.split("").map((letter,ind)=>{

                                            let active=""
                                            let statusOfLetter=""

                                            numberOfLetters++;

                                            active = (numberOfLetters === current+1 ? "active " :"")
                                            statusOfLetter=(value[numberOfLetters-1] ? (value[numberOfLetters-1] === letter) ? "correct" :"wrong" :"" )


                                            return(
                                                <Letter key={(ind+1)+99} letter={letter} statusOfLetter={statusOfLetter} active={active} />
                                            )
    
                                        })}
                                    </Words>
                            )
                        })}
                </div>
            </div>
        )
    }
        
    
}




export default memo(Pad)

const Letter=({letter,active,statusOfLetter})=>{


    return(
        <div className={`letter ${active}${statusOfLetter}`}>{`${letter===" " ?"\u00A0" :letter}`}</div>
    )

    
   
    
}

const Words=({children})=>{

    return(
        <div className="word" >{children}</div>
    )
}