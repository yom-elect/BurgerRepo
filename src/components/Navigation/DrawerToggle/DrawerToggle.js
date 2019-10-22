import React from 'react'
import './DrawerToggle.css'

const drawerToggle = ({clicked}) => {
    return (
        <div onClick={clicked} className="DrawerToggle">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default drawerToggle
