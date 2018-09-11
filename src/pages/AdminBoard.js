import React from "react";
import "./AdminBoard.css";

import axios from "axios";
import DayList from "../components/DayList";
import UserList from "../components/UserList";
import Form from "../components/Form";
import Login from "../components/Login";


const url = 'https://calendar-booking-api.herokuapp.com'
// const url = 'http://localhost:4000'

export default class AdminBoard extends React.Component {

  state = {
    count: '',
    days: [],
    users: [],
    shouldHide: Boolean,
  }

componentWillMount() {
  
  const token = localStorage.getItem('token');
    
    if (token != null) { this.setState({shouldHide: false}) }

  console.log('token', token) 

  let config = {
   
    headers: { 'Access-Control-Allow-Origin': '*',
     'Content-Type':'application/json',
      'Authorization':'Bearer '+token  },
  }      


  axios.get(url+'/dates', config)
    .then( response => {
    
    const newDays = response.data.days.map((day, i) => {
      return {
        _id: day._id,
        date: day.date,
        month: day.month,
        year: day.year,
        time: day.time.time,
        description: day.time.description,
        duration: day.time.duration
             
      }
  });

  const newState = Object.assign({}, this.state, {
                                                  days: newDays
                                                  })
      this.setState(newState);
  })
  .catch(error => console.log('BAD DAYS', error))
   
  axios.get(url+'/user', config)
    .then( response => {
       const newUsers = response.data.users.map((user, i) => {
        return {

        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,     
        };
    });

      const newStateUsers = Object.assign({}, this.state, {
                                                            users: newUsers
                                                          })
      this.setState(newStateUsers);
  })
  .catch(Error)

  };


  render() {

    return (   
     
      <div key={this.board} className='board'>

          <div className={this.state.shouldHide ? '' : "hidden"}>
          
            <Login key={this.props.login}/>
          
          </div>


          <div className={this.state.shouldHide ? 'hidden' : ""}>

            <Form key={this.props.form}/>
              
          </div>


          <div className={this.state.shouldHide ? 'hidden' : ""}>

            <legend> USERS </legend>
                 
              <UserList key={this.user} users={this.state.users} />
            
          </div>

              
          <div className={this.state.shouldHide ? 'hidden' : ""}>
              
            <legend> APPOINTMENTS </legend>
                  
              <DayList key={this.days} days={this.state.days} />
              
          </div>     

      </div>
    
    );
  }
}
