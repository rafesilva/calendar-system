import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Reset.css";
import axios from 'axios'

// const url = 'https://calendar-booking-api.herokuapp.com'
const url = 'http://localhost:4000'


export default class Reset extends Component {
  constructor(props) {
  super(props);

    this.state = {
      confirm: String,
      password: String,
      
      tokenReset: String,
      tokenPresent: Boolean
    };
  }

  componentWillMount() {
  
  const token = localStorage.getItem('token');
              
    if (token != null) { 
      this.setState({shouldHide: false}) 
    }

      // const {match} = this.props
      // const tokenReset = match.params.tokenreset
      // console.log(tokenReset)   
  } 


  validateForm() {

    return this.state.password.length === this.state.confirm.length;
  }


  handleChange = event => {

    this.setState({
      [event.target.id]: event.target.value
    
    });
  }

  handleSubmit = event => {

  const newValidation = Object.assign({}, this.state, {
        tokenReset:  this.props.match.params.tokenreset,
        password: this.state.password,
        confirm: this.state.confirm

  });

  let config = {
          headers: { 
            'Access-Control-Allow-Origin': '*' ,'Content-Type':'application/json' }, newValidation
  }      
   
    axios.post( url+"/user/reset/", newValidation, config )
      .then(res => {

          window.alert('Reseted successfully.')      
          window.location.href = "/login"

        })

      .catch(Error)  
    
  }

  render() {

    return (
      <div className="board">
        <div className="Reset">

        <form onSubmit={this.handleSubmit}>

        <FormGroup controlId="password" bsSize="large">
          <label>Reset Password</label>
          <br />

          <ControlLabel>Password</ControlLabel>
          <br />

          <FormControl
            autoFocus
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          </FormGroup>

        <FormGroup controlId="confirm" bsSize="large">
            <ControlLabel>Confirm</ControlLabel>
            <br />

          <FormControl
            name="confirm"
            value={this.state.confirm}
            onChange={this.handleChange}
            type="password"
          />

          </FormGroup>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="button" onClick={this.handleSubmit}
          >
            Reset
          </Button>
     
        </form>
         
      </div>

    </div>
    );
  }
}