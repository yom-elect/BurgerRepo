import React, { Component } from 'react'
import Order from '../../components/Burger/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../Errors/withErrorHandler'
import {connect} from 'react-redux'
import { fetchOrders } from '../../store/actions/orderAction';
import Spinner from '../../components/UI/Spinner/Spinner'

class  Orders extends Component {

    componentDidMount (){
        this.props.onFetchOrder()
    }

    render() {
        //Number.parseFloat()
        let {loading, orders} = this.props
        let order = <Spinner/>

        
        
        if (!loading && orders.length !== 0 ){
            order = orders.map(order=>(
                <Order key = {order.id} 
                ingredients={order.ingredients}
                price ={+order.price}/>    
            ))
        }
        else{
            order = <h4>No Order Yet</h4>
        }
        //console.log(order)
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onFetchOrder : ()=>dispatch(fetchOrders()),
    };
}
const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios))