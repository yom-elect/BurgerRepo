import * as actionTypes from './actionConstants'

export const addIngredient = (ingName)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:ingName
    }
}
export const removeIngredient = (ingName)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingName
    }
}