import React, { Component } from 'react'
import CheckOutSummary from '../../components/Burger/Order/CheckOutSummary/CheckOutSummary'
import ContactDetail from './ContactDetail/ContactDetail'
import {Route} from 'react-router-dom'


export default class CheckOut extends Component {
    
    // componentDidMount(){
    //     let {location} = this.props
    //     const query = new URLSearchParams(location.search)
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){
    //         // ['salad' , 1]
    //         if (param[0] === 'price'){
    //             price = param[1]
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1]
    //         }
            
    //     }
    //     this.setState({ingredients, totalPrice: price})
    // }
    
    checkoutCanceledHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutCountinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-detail')
    }


    render() {
        let {ingredients,totalPrice} = this.state
        let {match} = this.props
        return (
            <div>
                <CheckOutSummary
                 ingredients={ingredients}
                 purchaseEnd={this.checkoutCanceledHandler}
                 purchaseGood={this.checkoutCountinuedHandler}/>
                 <Route path={match.path + '/contact-detail'} render={(props)=>(
                            <ContactDetail ingredients={ingredients} totalPrice={totalPrice} {...props}/>
                            )
                                            }/>
            </div>
        )
    }
}
