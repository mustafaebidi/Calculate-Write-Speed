
import {memo, useCallback, useEffect, useRef, useState} from "react"
import "./pad.css"


const Pad=({value,setValue,setStartGame,caseOfLetters,setCaseOfLetters,choosenSentence,setStartCountDown})=>{

    const [current,setCurrent]=useState(0)

    const globalTimer=useRef()

    const firstTime=useRef(true)

    const values=useRef(null)

    const storeLastPos=useRef(0)

    const padElement=useRef(null)

    const prevCurrent=useRef(true)


    const goToTop=(target,pos)=>{
        let scrollTo=pos;


        globalTimer.current=setInterval(() => {

            padElement.current.scrollTop=scrollTo

            if(scrollTo < (target+pos) ){
                clearInterval(globalTimer.current)
            }

            scrollTo=scrollTo-1

            
        },9);

    }

    const goToDown=(target,pos)=>{
        let scrollTo=pos;
        console.log("ahmed")


        globalTimer.current=setInterval(() => {

            padElement.current.scrollTop=scrollTo

            if(scrollTo > (target+pos)){

                clearInterval(globalTimer.current)
            }
            scrollTo+=1
            

        },9);
        
    }

    const scrollWithAnimatin=useCallback((target)=>{

        clearInterval(globalTimer.current)

        let tempPos=storeLastPos.current
        storeLastPos.current=storeLastPos.current+target


        if(target>0){
            goToDown(target,tempPos)

        }
        else{
            goToTop(target,tempPos)

        }
    },[])

    const handleChange=()=>{


        ///This First Time To run time After user click on keyboard
        if(firstTime.current){
            firstTime.current=false
            setStartCountDown(true)

        }


        values.current.focus()


        setValue(values.current.value)

        setCurrent((state)=>values.current.value.length ? values.current.value.length :0)

        prevCurrent.current=current


        let newArr=values.current.value.split("").map((word,index)=>{

            if(word===choosenSentence[index]){
                return {[index]:"corrent"}
            }
            else{
                return {[index]:"wrong"}
            }
            
        })

        setCaseOfLetters([...newArr])

        if(values.current.value.length === choosenSentence.length){
            setStartGame(false)
        }

    }





    useEffect(()=>{
        const allWord=document.querySelectorAll(".letter")

        if(current){

            ///amounOFScroll
            let amountOfIncrease=45;

            if(current > prevCurrent.current && allWord[current].offsetTop >  allWord[current-1].offsetTop){
                scrollWithAnimatin(amountOfIncrease)
            }
            else if(current < prevCurrent.current && allWord[prevCurrent.current].offsetTop >  allWord[current].offsetTop){
                scrollWithAnimatin(-amountOfIncrease)
            }
        }
        else{
            
            (padElement.current ? scrollWithAnimatin(-storeLastPos.current) : padElement.current=null)
        }

    },[value,current,scrollWithAnimatin])




    if(choosenSentence){

        let numberOfLetters=0;
        return(
            <div ref={padElement} className="pad">
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