import React, { Component } from 'react'
import CheckOutSummary from '../../components/Burger/Order/CheckOutSummary/CheckOutSummary'
import ContactDetail from './ContactDetail/ContactDetail'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'




 class CheckOut extends Component {
    
    // componentWillMount (){
    //     this.props.onInitPurchase()
    // }

    checkoutCanceledHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutCountinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-detail')
    }

    render() {
        let {match,ings, purchased} = this.props
        let purchasedRedirect = null;
        let summary = <Redirect to="/"/>
       
        if (ings){
            purchasedRedirect = purchased ? 
            <Redirect to ="/"/> : null; 
        }
        // eslint-disable-next-line no-lone-blocks   
        {ings && (
            summary =  (
            <div>
                {purchasedRedirect}
                <CheckOutSummary
                ingredients={ings}
                purchaseEnd={this.checkoutCanceledHandler}
                purchaseGood={this.checkoutCountinuedHandler}/>
                <Route path={match.path + '/contact-detail'} 
                component={ContactDetail}/>
            </div>   
            ))}
        
        return summary
    }
}

const mapStateToProps = (state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased: state.orders.purchased,
    }
}



export default connect(mapStateToProps)(CheckOut)