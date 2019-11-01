import React, { Component } from 'react'
import {connect} from 'react-redux'
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Errors/withErrorHandler'
import {addIngredient,removeIngredient, initIngredients} from '../../store/actions/action'
import axios from '../../axios-order'
import {purchaseInit} from '../../store/actions/orderAction'
import {setAuthRedirectPath} from '../../store/actions/authAction'

class BurgerBuilder extends Component {
    state = {
         purchasing: false,
         
    }
    componentDidMount (){
        this.props.onInitIngredients()
    }
 
    updatePurchaseStatus = (ingredients)=>{
        const sum = Object.keys(ingredients)
        
            .map(igkey =>{
                return ingredients[igkey]         
            })
           .reduce((sum,el)=>{
                   return sum+ el     
            },0)
          return   sum > 0 
    }
    
    purchaseHandler =()=>{
        if (this.props.isAuthenticated){
            this.setState({purchasing :true}) 
        } 
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        } 
        
        
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = ()=> {
        let {history,onInitPurchase} = this.props
        onInitPurchase()
        history.push('/checkout')

    }

    render() {
        let {purchasing} = this.state
        let {ings,totalPrice,onIngredientAdded,
             onIngredientRemoved,error, isAuthenticated} = this.props
        const disableInfo = {
            ...ings
        }
        //console.log(this.props)
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary =  null
    
        let burger = error ? <p>Ingredients can't be loaded</p> :<Spinner/>

        // eslint-disable-next-line no-lone-blocks
        {ings && ( burger = (
            <div>
                <Burger ingredients = {ings} />
                <BuildControls 
                ingredientAdded = {onIngredientAdded}
                ingredientRemoved = {onIngredientRemoved}
                disable = {disableInfo}
                price = {totalPrice}
                purchaseable = {this.updatePurchaseStatus(ings)}
                ordered={this.purchaseHandler}
                isAuth = {isAuthenticated}
                />
            </div>
        ) 
        )} 
         // eslint-disable-next-line no-lone-blocks
        {ings && ( orderSummary = <OrderSummary 
            ingredients={ings}
            purchaseEnd={this.purchaseCancelHandler}
            purchaseGood={this.purchaseContinueHandler}
            price = {totalPrice}/>)}
        
        return (
            <div>
                 
                <Modal show = {purchasing} modalClosed={this.purchaseCancelHandler}> 
                   {orderSummary}
                </Modal>
                {burger}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated : state.auth.token !==null,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onIngredientAdded: (ingName)=> dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(removeIngredient(ingName)),     
        onInitIngredients: ()=>dispatch(initIngredients()),
        onInitPurchase: ()=>dispatch(purchaseInit()),
        onSetAuthRedirectPath : (path)=>dispatch(setAuthRedirectPath(path))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))  ;