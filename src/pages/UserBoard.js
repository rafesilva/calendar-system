import React from "react";
import "./UserBoard.css";

import OrderList from "../components/OrderList";
import axios from "axios"

// const url = 'https://calendar-booking-api.herokuapp.com'
const url = 'http://localhost:4000'

export default class UserBoard extends React.Component {

  state = {
    userId: String,
    orders: [],
    
    isAdmin: Boolean,
    shouldHide: Boolean
    
  }
 
    componentWillMount() {
    const newUserId = localStorage.getItem('uinfo');

    const uid = JSON.parse(newUserId)
    this.setState({userId: uid.data.id});
   
    const token = localStorage.getItem('token');

    let config = {
      
        headers: { 'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token  },
        }

    axios.get(url+'/orders/', config)
      .then(res => {
        
        const newOrders = res.data.orders.map((order, i) => {
          
            return {
              _id: order.doc._id,
              name: order.doc.serviceId.name,
              description: order.doc.serviceId.description,
              duration: order.doc.serviceId.duration  
          };
        });

          const newStateOrders = Object.assign({}, this.state, {
            orders: newOrders
        });

          this.setState(newStateOrders);
       })

      .catch(error => console.log('BAD ORDERS', error))

    }

    render() {       
   
    
    return (
  <div><h2>Your Orders</h2>

   <OrderList keys={ this.orders } orders={ this.state.orders }/>
  </div>
  
     )
  }
}


