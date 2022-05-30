


import "./beginning.css"
const Beginning=({setLevel,setStartGame})=>{

    return(

        <div className="beginning">
            <div className="container">
                <div className="container-media">
                    <div className="media">
                        <img  src="/image/pastille-vitesse.svg" alt=""/>
                        <img  src="/image/pastille-precision.svg" alt=""/>
                        <img  src="/image/pastille-methode.svg" alt=""/>
                    </div>
                </div>


                <div className="info">
                    <div className="text">
                        <h2>Test Your Typing Speed!</h2>
                        <p>Test your speed and accuracy using our free typing test. Use your results to see how far a proper typing method could take you!</p>
                    </div>
                    <div className="choosen">
                        <h1>Choose the duration of the test:</h1>
                        <div onClick={()=>{
                            setLevel("hard")
                            setStartGame(true)}}>
                        One Minute</div>
                        <div onClick={()=>{
                            setLevel("medium")
                            setStartGame(true)}}>
                        Three Minute</div>
                        <div onClick={()=>{
                            setLevel("easy")
                            setStartGame(true)}}>
                        Five Minutes</div>
                    </div>

                </div>
            </div>
            
        </div>


    )
}

export default Beginning