import React from 'react'
import burgerLogo from '../../../assets/images/burger-logo.png'
import './Logo.css'
const logo = ({height,margin})=> {
    return (
        <div className="Logo" style={{height:height,marginBottom:margin}}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    )
}

export default logo
