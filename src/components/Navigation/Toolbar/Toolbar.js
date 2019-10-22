import React from 'react'
import Logo from '../Logo/Logo'
import Navigation from '../NavigationItems/NavigationItems'
import DrawerToggle from '../DrawerToggle/DrawerToggle'
import './Toolbar.css'


const  toolbar = ({drawerToggleClicked})=> {
    return (
        <div>
           <header className="Toolbar ">
                <DrawerToggle clicked = {drawerToggleClicked}/>
               <Logo height="80%"/>
                <div>
                    <nav className="DesktopOnly">
                        <Navigation/>
                    </nav>
                </div>
            </header> 
        </div>
    )
}

export default toolbar
