import React from 'react'
import './Order.css'



const order = ({ingredients,price})=> {
    const ingredientsCk =[]

    for (let ingredientName in ingredients){
        ingredientsCk.push({
            name: ingredientName,
            amount : ingredients[ingredientName]})
    }
    const ingredientOutput = ingredientsCk.map(ig=>{
            return <span style = {{
                textTransform:'capitalize',
                display:'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc' ,
                padding : '5px'
            }}
            key ={ig.name}>{ig.name} ({ig.amount})</span>                                               
    })
    return (
        <div className="Order">
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong> ₦ {price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order
