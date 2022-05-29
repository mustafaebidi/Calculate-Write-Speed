
import { useCallback, useEffect ,useRef} from "react"
import "./keyboard.css"


const KeyBoard=({value})=>{

    const glocbals=useRef(false)

    function toggleLetter(e) {
        document.getElementById("main").focus()

        if(e.code === "Space" ){
            glocbals.current=true

            return;
        }
        if(e.code === "CapsLock"){
            if (e.getModifierState("CapsLock")) {
                console.log(88880)
                document.querySelector(".caps").classList.add("active")
                for(let i=0;i<document.querySelectorAll(".row .key").length;i++){
                    document.querySelectorAll(".row .key")[i].innerHTML=document.querySelectorAll(".row .key")[i].innerHTML.toUpperCase()
                }
            }
            if(!e.getModifierState("CapsLock")){
                document.querySelector(".caps").classList.add("active")
    
                for(let i=0;i<document.querySelectorAll(".row .key").length;i++){
                    document.querySelectorAll(".row .key")[i].innerHTML=document.querySelectorAll(".row .key")[i].innerHTML.toLowerCase()
                }
    
            }
        }
        
    }

    const removeClassActive=useCallback(()=>{

        for(let i=0;i<document.querySelectorAll(".row .key").length;i++){

                document.querySelectorAll(".row .key")[i].classList.remove("active")
        }
        
    },[])

    

    const addClassActive=useCallback(()=>{

        
        if(glocbals.current){
            document.querySelector(".space").classList.add("active")
            glocbals.current=false
            return;

        }

        for(let i=0;i<document.querySelectorAll(".row .key").length;i++){

            if(document.querySelectorAll(".row .key")[i].innerHTML === value[value.length-1]){
                document.querySelectorAll(".row .key")[i].classList.add("active")
            }

        }
        
    },[value])

    useEffect(()=>{
            removeClassActive()
            addClassActive()

            


        document.addEventListener('keydown', toggleLetter);
        document.addEventListener('keyup', removeClassActive);
        //document.getElementById("ss").addEventListener('input', ()=>console.log(55));


        return(()=>{
            //document.removeEventListener('keydown', addClassActive);
            document.removeEventListener('keydown', toggleLetter);
            document.removeEventListener('keyup', removeClassActive);


            //document.getElementById("ss").removeEventListener('input', ()=>console.log(55));
        })
    },[addClassActive, removeClassActive, value])

    return(
    
        <div className="keyboard">

            <div className="row">
                <div className="key" >q</div>
                <div className="key"  >w</div>
                <div className="key"  >e</div>
                <div className="key"  >r</div>
                <div className="key"  >t</div>
                <div className="key"  >y</div>
                <div className="key"  >u</div>
                <div className="key"  >i</div>
                <div className="key"  >o</div>
                <div className="key"  >p</div>
            </div>
            <div className="row">
                <div className="key"  >a</div>
                <div  className="key"  >s</div>
                <div className="key"  >d</div>
                <div className="key"  >f</div>
                <div className="key"  >g</div>
                <div className="key"  >h</div>
                <div className="key"  >j</div>
                <div className="key"  >k</div>
                <div className="key"  >l</div>
            </div>
            <div className="row">
                <div className="caps key">caps</div>
                <div className="key">,</div>
                <div className="key">z</div>
                <div className="key">x</div>
                <div className="key">c</div>
                <div className="key">v</div>
                <div className="key">b</div>
                <div className="key">n</div>
                <div className="key">m</div>
                <div className="key">.</div>
                <div className="backspace key">del</div>
            </div>
            <div className="row">
                <div className="space key">
                    Space
                </div>
            </div>
        </div>
    )

}

export default KeyBoard