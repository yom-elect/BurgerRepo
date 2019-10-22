import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import './Burger.css'
import {withRouter} from 'react-router-dom'

const  burger= ({ingredients})=> {
    let transformedingredients = Object.keys(ingredients)
        .map(igKey=>{
            return [...Array(ingredients[igKey])].map((_,i)=>{
               return <BurgerIngredient key={igKey + i} type = {igKey}/>                                     
            })         
        })
        .reduce((arr,el)=>{
            return arr.concat(el)          
        }, [])
        
    // eslint-disable-next-line no-lone-blocks
    {transformedingredients.length ===0 && (transformedingredients = <p> Please start adding ingredients </p>)}
    
    return (
        <div className ="Burger">
            <BurgerIngredient type = "bread-top"/>
            {transformedingredients}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    )
}


export default withRouter(burger);

