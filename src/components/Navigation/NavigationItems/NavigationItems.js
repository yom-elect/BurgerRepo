import React from 'react'
import './NavigationItems.css'
import {NavLink} from 'react-router-dom'

const navigation = ()=> {
    return (
        <div>
            <ul className="NavigationItems">
                <li className="NavigationItem">
                    <NavLink to ="/"  exact activeClassName="active" >Burger Builder</NavLink>
                </li>
                <li className="NavigationItem">
                   <NavLink to ="/orders" activeClassName="active">Orders</NavLink>
                </li>
            </ul>
            
        </div>
    )
}

export default navigation
