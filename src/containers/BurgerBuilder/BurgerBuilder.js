import React, { Component } from 'react'
import {connect} from 'react-redux'
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Errors/withErrorHandler'
import {addIngredient,removeIngredient} from '../../store/actions/action'



class BurgerBuilder extends Component {
    state = {
         purchasing: false,
         loading: false,
         error:null,
    }
    
    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res=>{
        //         this.setState({ingredients: res.data})
        //     }).catch(err=>{
        //         this.setState({error: err})
        //     })
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
    // addIngredientHandler = (type)=>{
    //     const {totalPrice, ingredients} =this.state
    //     const updatedCount = ingredients[type] + 1
    //     const updatedIngredients = {
    //         ...ingredients
    //     }
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     updatedIngredients[type] = updatedCount
    //     const newPrice = totalPrice + priceAddition
    //     this.setState({
    //             totalPrice: newPrice,
    //             ingredients: updatedIngredients,     
    //     })
    //     this.updatePurchaseStatus(updatedIngredients)

    // }
    
    // removeIngredientHandler = (type)=>{
    //     const {totalPrice, ingredients} =this.state
    //     if (ingredients[type] ===0)
    //         return
    //     const updatedCount = ingredients[type] - 1
    //     const updatedIngredients = {
    //         ...ingredients
    //     }
    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     updatedIngredients[type] = updatedCount
    //     const newPrice = totalPrice - priceDeduction
    //     this.setState({
    //             totalPrice: newPrice,
    //             ingredients: updatedIngredients,     
    //     })
    //     this.updatePurchaseStatus(updatedIngredients)
    // }
    purchaseHandler =()=>{
        this.setState({purchasing :true}) 
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = ()=> {
        let {history} = this.props
        let {ingredients, totalPrice} = this.state
        //alert('You continue')
      
       
        const queryParams = [];
        for (let ele in ingredients){
            queryParams.push(encodeURIComponent(ele) + '=' + encodeURIComponent(ingredients[ele]))
        }
        queryParams.push('price='+totalPrice)
        //console.log(queryParams)
        const queryString = queryParams.join('&')
        history.push({
            pathname: '/checkout',
            search: '?' + queryString                
        })

    }

    render() {
        let {error,purchasing,loading} = this.state
        let {ings,totalPrice,onIngredientAdded,onIngredientRemoved} = this.props
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
        if (loading) {
            orderSummary = <Spinner/>
        }
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
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onIngredientAdded: (ingName)=> dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(removeIngredient(ingName)),        
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))  ;