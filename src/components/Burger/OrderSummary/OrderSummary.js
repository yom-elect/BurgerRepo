import React from 'react'
import Button from '../../UI/Buttons/Button'
const orderSummary = ({ingredients, purchaseEnd,purchaseGood, price})=> {
    const ingredientSummary = Object.keys(ingredients)
        .map((igkys)=>{
             return (<li key={igkys}>
                    <span style = {{textTransform:'capitalize'}}>
                    {igkys}</span> : {ingredients[igkys]}
                </li>    
        )})
        
    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredient:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong> Total Price: ₦ {price.toFixed(2)}</strong></p>
            <p>Continue to chekout?</p>
            <Button clicked= {purchaseEnd} btnType = "Danger" >CANCEL</Button>
            <Button clicked={purchaseGood} btnType = "Success">COUNTINUE</Button>
            
        </div>
    )
}

export default orderSummary