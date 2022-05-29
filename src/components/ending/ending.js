
import "./ending.css"

const Ending=({level,value,caseOfLetters,setStartGame,setLevel,choosenSentence})=>{

    const typeLevel={easy:5,medium:3,hard:1}


    console.log(value.split(" ").length)

    const getSpeedOfWriting=()=>{

        let wordPerMinute;

        if(typeLevel[level] === 1 ){
            wordPerMinute=choosenSentence.slice(0,value.length).split(" ").length

        }
        else{

        }
        return wordPerMinute

    }
    const getLengthWrongWords=()=>{

        let sum=0

        for(let i=0;i<caseOfLetters.length;i++){
            if(caseOfLetters[i][i] === "wrong" ){
                sum=sum+1
            }
        }
        return sum



    }

    const getTime=()=>{

        return `${typeLevel[level]} :00`


    }
    

    let writtenLetters=value.length ? value.length  : 1 

    return(

        <div className="ending">
            <div className="result-container">
                <div className="info">
                    <div className="text">
                        <h2 className="result-motivational-title">Keep Training!</h2>
                        <h4 className="result-motivation-msg">Keep practicing, you will be able to write faster.</h4>
                    </div>

                    <div className="speed">
                        <div className="net-speed-label">The Speed</div>
                        <div className="net-speed">{getSpeedOfWriting()}</div>
                        <h6 className="speed-unit">word per minute</h6>

                    </div>


                
                </div>

                <div className="result-info">
                    <div className="precision">
                        <div className="precision-label">Precision</div>
                        <div className="precision-rate">{ parseInt(( (writtenLetters - getLengthWrongWords() ) / writtenLetters)*100) } %</div>
                    </div>
                    <div className="time">
                        <div className="time-label">Time</div>
                        <div className="clock">{getTime()}</div> 
                    </div>
                </div>
                

            
            </div>
            <div className="again" onClick={()=>{
                setStartGame(false)
                setLevel(false)
            }}>Play Again</div>

        </div>

    )

}


export default Ending