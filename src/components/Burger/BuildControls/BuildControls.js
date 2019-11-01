import React from 'react'
import BuildControl from './BuildContol/BuildControl'
import './BuildControls.css'
const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
]


const  buildControls = ({ingredientAdded,
                         ingredientRemoved,
                         disable, price,
                        purchaseable, ordered, isAuth}) =>{
    
    return (
        <div className="BuildControls">
            <p>Current Price :<strong> {price.toFixed(2)} </strong> </p>
            {controls.map((ctrl,i)=>(
                <BuildControl key={i} 
                label = {ctrl.label} 
                added={()=>ingredientAdded(ctrl.type)}
                removed = {()=>ingredientRemoved(ctrl.type)}
                disabled = {disable[ctrl.type]}
                />           
            ))}
           <button className= "OrderButton" 
           disabled={!purchaseable}
           onClick={ordered}>{isAuth ? 'ORDER NOW' : 'SIGN UP / SIGN IN TO ORDER'}</button>
        </div>
    )
}

export default buildControls
