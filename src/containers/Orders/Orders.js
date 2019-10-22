import React, { Component } from 'react'
import Order from '../../components/Burger/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../Errors/withErrorHandler'

 class  Orders extends Component {

    state ={
        orders: [],
        loading: true,
    }
    componentDidMount (){
        axios.get('/orders.json')
            .then(res=>{
                //console.log(res.data)
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,                 
                    })
                }
                this.setState({loading:false,orders:fetchedOrders})  
            }).catch(err=>{
                this.setState({loading:false})       
            })
    }

    render() {
        //Number.parseFloat()
            let {orders}= this.state
        return (
            <div>
                {
                   orders.map(order=>(
                       <Order key = {order.id} 
                       ingredients={order.ingredients}
                       price ={+order.price}/>           
                    )) 
                }
            </div>
        )
    }
}
export default withErrorHandler(Orders, axios)