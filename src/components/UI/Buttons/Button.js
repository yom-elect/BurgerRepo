import React from 'react'
import './Buttons.css'

const button = ({children,btnType,clicked})=> {
    return (
        <div>
            <button 
            className={`Button ${btnType}`}
            onClick={clicked}>
                {children}
            </button>
        </div>
    )
}

export default button
