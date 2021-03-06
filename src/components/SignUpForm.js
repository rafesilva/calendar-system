import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import "./SignUpForm.css";
import axios from 'axios'

// const url = 'https://calendar-booking-api.herokuapp.com'
const url = 'http://localhost:4000'


export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      email_s: String,
      password_s: String,
  	  confirm_password_s: String,
      phone_s: Number,
      name_s: String,
      user_s: String,

      
      token: String,
      tokenPresent: Boolean,
	    isAdmin: Boolean

    };
  }


  validateFormSignup() {
    return this.state.email_s.length > 0 && this.state.password_s.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

   handleSubmitSignUp = event => {
    event.preventDefault();

     const newValidation = Object.assign({}, this.state, {
      email: this.state.email_s,
      password: this.state.password_s,
	    name: this.state.name_s,        
	    phone: this.state.phone_s,
	    username: this.state.user_s
        
  });

    axios.post(url+'/user/signup', newValidation )
      .then(res => {

      console.log('SIGNUP DATA:', res)
      window.alert('YOU SUCCESFULLY SIGN UP')

      })
    .catch(Error)
  }

  render() {
    return (
      <div className="board">
      
        <div className="SignUp">
       <label>Signup</label>
        <form onSubmit={this.handleSubmitSignUp}>
          
          <span>
          <FormGroup controlId="user_s" bsSize="large">
         <ControlLabel>Username</ControlLabel>
          <br />

            <FormControl
              autoFocus
              type="string"
              value={this.state.user_s}
              onChange={this.handleChange}
            />
            
          </FormGroup>
          <div className="Separator"></div>
                  <FormGroup controlId="email_s" bssize="large">
          <ControlLabel>Email</ControlLabel>
          <br />

            <FormControl
              autoFocus
              type="email"
              value={this.state.email_s}
              onChange={this.handleChange}
            />
            
          </FormGroup>
          </span>
          
          <span>
          <FormGroup controlId="password_s" bssize="large">
          
          <ControlLabel>Password</ControlLabel>
          <br />
          
          <FormControl
              value={this.state.password_s}
              onChange={this.handleChange}
              type="password"
            />
          
          </FormGroup>
                   <div className="Separator"></div>

          <FormGroup controlId="confirm_password_s" bssize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <br />
          
          <FormControl
              value={this.state.confirm_s}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          </span>

          <span>
          <FormGroup controlId="name_s" bsSize="large">
        
           <ControlLabel>Full name</ControlLabel>
          <br />

          <FormControl
              autoFocus
              type="string"
              value={this.state.name_s}
              onChange={this.handleChange}
            />
          

          </FormGroup>
                 <div className="Separator"></div>

            <FormGroup controlId="phone_s" bssize="large">
            <ControlLabel>Phone</ControlLabel>
            <br />
            
          <FormControl
              value={this.state.phone_s}
              onChange={this.handleChange}
              type="number"
            />
          
          </FormGroup>
          </span>
          
          </form>

          <Button
            block
            bssize="large"
            disabled={!this.validateFormSignup}
            type="button" onClick={this.handleSubmitSignUp}
          >
            SignUp

          </Button>
          

        </div>
      </div>
    );
  }
}