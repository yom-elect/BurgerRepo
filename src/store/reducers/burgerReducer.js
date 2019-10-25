import * as actionTypes from '../actions/actionConstants'

const initialState = {
    ingredients: null,
    totalPrice: 250,
    error:false,
}

const INGREDIENT_PRICES = {
    salad: 120,
    bacon: 320,
    cheese: 170,
    meat: 220
}
const reducer = (state= initialState, action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                }, 
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error:false,
                totalPrice:250,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            }
        default : 
            return state
    }
}

export default reducer