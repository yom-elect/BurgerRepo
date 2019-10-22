import React from 'react'
import './Backdrop.css'
const  backdrop = ({show, clicked})=> {
    return (
        <div>
            {show && (<div className="Backdrop" onClick={clicked}></div>)}
        </div>
    )
}

export default backdrop
