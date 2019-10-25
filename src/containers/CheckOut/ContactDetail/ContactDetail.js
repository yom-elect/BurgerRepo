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
            name: InputTag('Your Name'),
            street:InputTag('Street'),
            zipCode: InputTag('Zip Code'),
            country:InputTag('Country'),
            email: InputTag('Your E-Mail'),
            deliveryMethod: DeliveryTag(),
            }, 
        loading: false,
    }

    orderHandler = (event)=> {
        event.preventDefault()
        let {ings, totalPrice, onOrderBuger} = this.props
        let {orderForm} = this.state
        //console.log(ingredients)
       
         const formData = {}
         for (let formIden in orderForm ){
            formData[formIden] = orderForm[formIden].value
         }
         const order = {
            ingredients:ings,
            price : totalPrice,
            orderData : formData,
        }
        onOrderBuger(order)
         //console.log(order)
    }

    inputChangedHandler = (event,inputIdentifier)=>{
        const updatedOrderForm = {
             ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm
        };
        updatedFormElement.value = event.target.value
        updatedOrderForm[inputIdentifier] = updatedFormElement;
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
        loading: state.orders.loading 
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onOrderBuger : (orderData) => dispatch(purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactDetail, axios) );