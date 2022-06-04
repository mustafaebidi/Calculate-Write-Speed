
import { useCallback, useEffect ,useRef} from "react"
import "./keyboard.css"


const KeyBoard=({value})=>{

    const allLetter=useRef(document.querySelectorAll(".row .key > div"))


    const LowerAllLetter=()=>{
        
        for(let i=0;i<allLetter.current.length;i++){
            if(!allLetter.current[i].children[0]){
                allLetter.current[i].innerHTML=allLetter.current[i].innerHTML.toLowerCase()
            }
            
        }
    }

    const upperAllLetter=()=>{
        
        for(let i=0;i<allLetter.current.length;i++){
            if(!allLetter.current[i].children[0]){
                allLetter.current[i].innerHTML=allLetter.current[i].innerHTML.toUpperCase()
            }
            
        }

    }

    const toggleLetter=useCallback((e)=> {


        document.getElementById("main").focus()


        if(e.code === "CapsLock"){

            if (e.getModifierState("CapsLock")) {

                document.querySelector(".caps > div").classList.add("active")
                upperAllLetter()
                
            }
            if(!e.getModifierState("CapsLock")){
                
                document.querySelector(".caps > div").classList.add("active")
                LowerAllLetter()

            }
        }
        
    },[])

    const removeClassActive=useCallback(()=>{

        for(let i=0;i<allLetter.current.length;i++){

                if(!allLetter.current[i].children[0]){
                    allLetter.current[i].classList.remove("active")
                }
        }
        
    },[])

    

    const addClassActive=useCallback(()=>{

        for(let i=0;i<allLetter.current.length;i++){

            if(!allLetter.current[i].children[0]){

                if(value[value.length-1] === " "){
                    document.querySelector(".space > div").classList.add("active")
                    return;

                }

                if(allLetter.current[i].innerHTML === value[value.length-1]) {
                    allLetter.current[i].classList.add("active")
                }

            }
        

        }
        
    },[value])

    useEffect(()=>{

        allLetter.current=document.querySelectorAll(".row .key > div")
        
        removeClassActive()
        addClassActive()

        document.addEventListener('keydown', toggleLetter);
        document.addEventListener('keyup', removeClassActive);

        return(()=>{
            document.removeEventListener('keydown', toggleLetter);
            document.removeEventListener('keyup', removeClassActive);
        
        })
    },[addClassActive, removeClassActive, toggleLetter, value])

    return(
    
        <div className="keyboard">

            <div className="row">

                <div className="key">
                    <div><div className="main-letter">`</div><div className="symbolic">~</div></div>
                </div>

        
                <div className="key">
                    <div><div className="main-letter">1</div><div className="symbolic">!</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">2</div><div className="symbolic">@</div></div>
                </div>

                <div className="key">
                    <div><div className="main-letter">3</div><div className="symbolic">#</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">4</div><div className="symbolic">$</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">5</div><div className="symbolic">%</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">6</div><div className="symbolic">^</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">7</div><div className="symbolic">&</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">8</div><div className="symbolic">*</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">9</div><div className="symbolic">(</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">0</div><div className="symbolic">)</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">-</div><div className="symbolic">_</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">-</div><div className="symbolic">_</div></div>
                </div>

                <div className="key">
                    <div><div className="main-letter">=</div><div className="symbolic">+</div></div>
                </div>

                <div className="key backspace">
                    <div>backspace</div>
                </div>

            </div>
            <div className="row">

                <div className="key tab">
                    <div>tab</div>
                </div>


                <div className="key"><div>q</div></div>
                <div className="key"><div>w</div></div>
                <div className="key"><div>e</div></div>
                <div className="key"><div>r</div></div>
                <div className="key"><div>t</div></div>
                <div className="key"><div>y</div></div>
                <div className="key"><div>u</div></div>
                <div className="key"><div>i</div></div>
                <div className="key"><div>o</div></div>
                <div className="key"><div>p</div></div>
                <div className="key">
                    <div><div className="main-letter">[</div><div className="symbolic">+</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">]</div><div className="symbolic">+</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">/</div><div className="symbolic">|</div></div>
                </div>


            </div>
            <div className="row">
                <div className="key caps">
                    <div>capslock</div>
                </div>
                <div className="key" >
                    <div>a</div>
                </div>
                <div  className="key">
                    <div>s</div>
                </div>
                <div className="key">
                    <div>d</div>
                </div>
                <div className="key">
                    <div>f</div>
                </div>
                <div className="key">
                    <div>g</div>
                </div>
                <div className="key" >
                    <div>h</div>
                </div>
                <div className="key" >
                    <div>j</div>
                </div>
                <div className="key" >
                    <div>k</div>
                </div>
                <div className="key" >
                    <div>l</div>
                </div>
                <div className="key">
                    <div><div className="main-letter">;</div><div className="symbolic">:</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">'</div><div className="symbolic">"</div></div>
                </div>
                <div className="key entre">
                    <div>entre</div>
                </div>
            </div>
            <div className="row">
                <div className="key lshift">
                    <div>lshift</div>
                </div>
                <div className="key">
                    <div>z</div>
                </div>
                
                <div className="key">
                    <div>x</div>
                </div>
                <div className="key">
                    <div>c</div>
                </div>
                <div className="key">
                    <div>v</div>
                </div>
                <div className="key">
                    <div>b</div>
                </div>
                <div className="key">
                    <div>n</div>
                </div>
                <div className="key">
                    <div>m</div>
                </div>
                <div className="key">
                    <div><div className="main-letter">,</div><div className="symbolic">&lt;</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">.</div><div className="symbolic">&gt;</div></div>
                </div>
                <div className="key">
                    <div><div className="main-letter">/</div><div className="symbolic">?</div></div>
                </div>
                <div className="key rshift">
                    <div>rshift</div>
                </div>
            </div>
            <div className="row">
                <div className="key">
                    <div>ctrl</div>
                </div>
                <div className="key">
                    <div>lalt</div>
                </div>

                <div className="space key">

                    <div>Space</div>
    
                </div>
                <div className="key">
                    <div>ralt</div>
                </div>
            </div>

        </div>
    )

}

export default KeyBoard