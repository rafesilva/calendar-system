import React from "react";
import "./Order.css";
import axios from "axios";

// import PropTypes from "prop-types";
  
const url = 'http://localhost:4000'
 
// const url = 'https://calendar-booking-api.herokuapp.com'

function Order(props) {
    
function onDelete() {
      
      const token = localStorage.getItem('token');

      const orderId = props._id; 
      
      let config = {
   
      headers: { 'Access-Control-Allow-Origin': '*', 
        'Content-Type':'application/json', 
        'Authorization':'Bearer '+token  
        },
      }
      axios.delete(url+'/orders/'+orderId, config )
        .then(res => {
           window.alert('ORDER Deleted', res)
           return window.location.reload();      
      })
        .catch(Error)
  }

  return (

<div className="order">
<br />
 <label>ID </label>
   <div className="props">{props._id}</div>
   <br />
   <label>Name </label>
    <div className="props">{props.name}</div>
      <br />
      <label>Description </label>
        <div className="props">{props.description}</div>
        <br />
         <label>Duration </label>
          <div className="props">{props.duration}</div>
          <br />
           <br />      
            <button onClick={onDelete} >Delete Order </button>
             <br />

        </div>
 );
}

/// Day.propTypes = {
//   month: PropTypes.integer.isRequired
//   };

export default Order;