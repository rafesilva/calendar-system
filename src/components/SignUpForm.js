// import React, { Component } from "react";
// import { Form, Button, FormGroup, Input, Label, Container, Row, Col } from "reactstrap";
// export default class SignUpForm extends Component {
//   constructor() {
//     super();
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
    
//     handleSubmit(e) {
      
//       e.preventDefault();
//       const data = new FormData(this.handleSubmit);

//       fetch('http://localhost:8081/signup', {
//         method: 'POST',
//         body: data,
//       });
//     }
    
//     render() {
//       return (

//       <Container>
//         <Row>
//         <Col sm="12" md={{ size: 20 }}>
//         <h1>Register</h1>
//         <Form onSubmit={this.handleSubmit}>
//         <FormGroup>
//         <Label> Name </Label> 
//         <Input type="text" name="name"  />
//         </FormGroup>
        

//         <FormGroup>
//         <Label> Password </Label>
//         <Input type="password" name="password"  />
//         </FormGroup>
       
//         <FormGroup>
//         <Label> Email </Label>
//         <Input type="text" name="email"  />
//         </FormGroup>

//         <FormGroup>
//         <Label> Phone Number </Label>
//         <Input type="text" name="phnumber"  />
//         </FormGroup>
        
        
//         <Button type="submit">Submit </Button>

//         </Form>
//         </Col>
//         </Row>
        
//       </Container>
//       );
//     }
//   }


  
import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Board.css";
import axios from 'axios'
const url = 'https://calendar-booking-api.herokuapp.com'
// const url = 'http://localhost:4000'


export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      email_s: "",
      password_s: "",
	  confirm_password_s: "",
      phone_s: Number,
      name_s: "",
      user_s: "",

      
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
      
        <form onSubmit={this.handleSubmitSignUp}>
          <FormGroup controlId="user_s" bsSize="large">
          <label>Signup</label>
          <br />
               <ControlLabel>Username</ControlLabel>
            <br />

            <FormControl
              autoFocus
              type="string"
              value={this.state.user_s}
              onChange={this.handleChange}
            />
            
          </FormGroup>
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
          <FormGroup controlId="password_s" bssize="large">
            <ControlLabel>Password</ControlLabel>
            <br />
            <FormControl
              value={this.state.password_s}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
            <FormGroup controlId="confirm_password_s" bssize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <br />
            <FormControl
              value={this.state.confirm_s}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
            <FormGroup controlId="name_s" bsSize="large">
        
          <br />
               <ControlLabel>Full name</ControlLabel>
            <br />

            <FormControl
              autoFocus
              type="string"
              value={this.state.name_s}
              onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="phone_s" bssize="large">
            <ControlLabel>Phone</ControlLabel>
            <br />
            <FormControl
              value={this.state.phone_s}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <Button
            block
            bssize="large"
            disabled={!this.validateFormSignup}
            type="button" onClick={this.handleSubmitSignUp}
          >
            SignUp
          </Button>
          </form>

       
       
      </div>
      </div>
    );
  }
}