import React from "react";
import Order from "./Order";

function OrderList(props) {

  return (

 <div>
      {
              props.orders.map((order, o) => 

        <Order _id={order._id} 
        name={order.name} 
        description={order.description} 
        duration={order.duration} 
       />

      )}
        
     </div> 
  ); 
} 

export default OrderList;