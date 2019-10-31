import React from 'react'
import './NavigationItems.css'
import {NavLink} from 'react-router-dom'

const navigation = ({isAuthenticated})=> {
    return (
        <div>
            <ul className="NavigationItems">
                <li className="NavigationItem">
                    <NavLink to ="/"  exact activeClassName="active" >Burger Builder</NavLink>
                </li>
                <li className="NavigationItem">
                   <NavLink to ="/orders" activeClassName="active">Orders</NavLink>
                </li>
                {!isAuthenticated ?
                 <li className="NavigationItem">
                   <NavLink to ="/auth" activeClassName="active">Sign-Up</NavLink>
                </li> : 
                <li className="NavigationItem">
                <NavLink to ="/logout" activeClassName="active">Logout</NavLink>
             </li>
                }
                
            </ul>
            
        </div>
    )
}

export default navigation
