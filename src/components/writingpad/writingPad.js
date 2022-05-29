import { memo } from "react"

import "./writingPad.css"

const WritingPad=({children})=>{



    return(
        <div className="writing-pad">
           {children}
        
        </div>
    )

}

export default memo(WritingPad)