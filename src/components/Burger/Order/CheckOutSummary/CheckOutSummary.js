import React from 'react'
import Burger from '../../Burger'
import Button from '../../../UI/Buttons/Button'
import './CheckOutSummary.css'

const checkOutSummary=({ingredients,purchaseEnd,purchaseGood})=> {

    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={ingredients}/>
            </div>
            <Button btnType="Danger" clicked = {purchaseEnd}>CANCEL</Button>
            <Button btnType="Success" clicked ={purchaseGood}>COUNTINUE</Button>
        </div>
    )
}

export default checkOutSummary
