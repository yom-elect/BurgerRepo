import React from 'react'
import Logo from '../Logo/Logo'
import Navigation from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './SideDrawer.css'

const sideDrawer = ({open,closed, isAuth})=> {
    let Close = "Close"; let Open = "Open"
    let attachedClasses = `SideDrawer  ${Close}`
    if (open){
        attachedClasses = `SideDrawer  ${Open}`
    }
    return (
        <div>
            <Backdrop show= {open} clicked={closed}/>
            <div className={attachedClasses} clicked={closed}>
            <Logo height = "11%" margin="32px"/>
            <nav>
                <Navigation isAuthenticated={isAuth}/>
            </nav>
        </div>
        </div>
        
    )
}

export default sideDrawer
