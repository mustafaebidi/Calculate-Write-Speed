
import "./ending.css"

const Ending=({level,value,setStartGame,setLevel,choosenSentence,storeAverageSpeedPerMinute})=>{
    console.log(storeAverageSpeedPerMinute)

    const typeLevel={easy:5,medium:3,hard:1}

    const getMoreThanMinute=()=>{

        let averageRate=0;

        let numberOfMinute=storeAverageSpeedPerMinute.length

        for(let i=0;i<storeAverageSpeedPerMinute.length;i++){

            if(i===0){
                averageRate=choosenSentence.slice(0,storeAverageSpeedPerMinute[i]).split(" ").length
            }
            else{
                let wordsWrittenAtThisMoment=choosenSentence.slice(storeAverageSpeedPerMinute[i-1],storeAverageSpeedPerMinute[i]).split(" ").length
                averageRate+=(storeAverageSpeedPerMinute[i] <= storeAverageSpeedPerMinute[i-1] ? 0 :wordsWrittenAtThisMoment)

            }
        }
        return parseInt(averageRate/numberOfMinute);
    }

    const getSpeedOfWriting=()=>{

        let wordPerMinute;

        if(level ==="easy" ){

            wordPerMinute=choosenSentence.slice(0,storeAverageSpeedPerMinute[0].length).split(" ").length

        }
        else{
            wordPerMinute=getMoreThanMinute()

        }

        return wordPerMinute

    }
    const getNumberOfWrongLetters=()=>{

        let sum=0

        for(let i=0;i<value.length;i++){

            if(choosenSentence[i] !== value[i] ){
                sum=sum+1
            }
        }
        return sum


    }

    const getTime=()=>{
        return `${typeLevel[level]} :00`
    }
    

    let TheWrittenLetters=value.length ? value.length  : 1 

    return(

        <div className="ending">
            <div className="all">
                <div className="result-container">

                    <div className="info">

                        <div className="text">
                            <h2 className="result-motivational-title">Keep Training!</h2>
                            <h4 className="result-motivation-msg">Keep practicing, you will be able to write faster.</h4>
                        </div>

                        <div className="speed">
                            <div className="net-speed-label">The Speed</div>
                            <div className="net-speed">{getSpeedOfWriting()}</div>
                            <h6 className="speed-unit">Word Per Minute</h6>

                        </div>
                    
                    </div>

                    <div className="result-info">
                        <div className="precision">
                            <div className="precision-label">Precision</div>
                            <div className="precision-rate">{ parseInt(( (TheWrittenLetters - getNumberOfWrongLetters() ) / TheWrittenLetters)*100) } %</div>
                        </div>
                        <div className="time">
                            <div className="time-label">Time</div>
                            <div className="clock">{getTime()}</div> 
                        </div>
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