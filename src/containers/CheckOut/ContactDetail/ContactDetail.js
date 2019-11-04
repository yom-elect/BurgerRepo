import React, { Component } from 'react';
import Button from '../../../components/UI/Buttons/Button';
import './ContactDetail.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import {InputTag,DeliveryTag} from '../../../util/InputConfig.js'
import {ValidatorChecker} from '../../../util/ValidatorCheck';
import { ValidatorForm} from 'react-material-ui-form-validator';
import {connect} from 'react-redux'
import withErrorHandler from '../../../Errors/withErrorHandler'
import { purchaseBurger } from '../../../store/actions/orderAction';

 class ContactDetail extends Component {
    state = {
        orderForm:{
            name: InputTag('Your Name','name'),
            street:InputTag('Street','text'),
            zipCode: InputTag('Zip Code','text'),
            country:InputTag('Country','text'),
            email: InputTag('Your E-Mail', 'text'),
            deliveryMethod: DeliveryTag(),
            }, 
        loading: false,
    }

    orderHandler = (event)=> {
        event.preventDefault()
        let {ings, totalPrice, onOrderBuger, token,userId} = this.props
        let {orderForm} = this.state
         const formData = {}
         for (let formIden in orderForm ){
            formData[formIden] = orderForm[formIden].value
         }
         const order = {
            ingredients:ings,
            price : totalPrice,
            orderData : formData,
            userId,
        }
        onOrderBuger(order,token)
    }

    inputChangedHandler = (event,inputIdentifier)=>{
        const updatedOrderForm = {
             ...this.state.orderForm,
             [inputIdentifier]:{
                 ...this.state.orderForm[inputIdentifier],
                 value:event.target.value
             }
        };
        this.setState({orderForm:updatedOrderForm})
    }
  
    render() {
        const {loading, orderForm} = this.state
        const formElementsArray = [];
        for (let key in orderForm ){
            formElementsArray.push({
                id: key,
                config: orderForm[key]   
            })
        }
        let form = ( <ValidatorForm 
                    ref="form"
                    onSubmit={this.orderHandler}
                    onError={errors => console.log(errors)} >
            {formElementsArray.map((formElement,i)=>(
                <Input key={i} elementType={formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                validator= {ValidatorChecker}
                id={formElement.id}
                />
            ))}
            <Button btnType="Success" >ORDER</Button>
        </ValidatorForm>)
        // eslint-disable-next-line no-lone-blocks
        {loading && (form=<Spinner/>)}
        return (
            <div className="ContactDetail">
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading: state.orders.loading ,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onOrderBuger : (orderData,token) => dispatch(purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactDetail, axios) );