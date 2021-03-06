import React, { Component } from 'react';
//import { BrowserRouter as Router,Redirect } from 'react-router-dom' 
import Calendar from 'react-calendar-material';
import BookInfo from '../components/BookInfo';
import {Row, Col} from 'reactstrap';
import { withRouter } from 'react-router';
import axios from 'axios'

// const url = 'https://calendar-booking-api.herokuapp.com'
const url = 'http://localhost:4000'

class BookCal extends Component {
  constructor(props){
    super(props);
    this.state = {
      daysData: [],
      used: []

    }
  }

  // componentDidMount() {
  //   //console.log(this.state);
  // }

  // toggle() {
  //   this.setState({ collapse: true });
  // }

 // Display timeslot when ther is no previous booking
  checkTimeSlot = (timeSlot,duration) => {
      let arrLength = timeSlot.length
      let sliceIndex = duration/(.5)
      let newLength = ((arrLength+1)- sliceIndex)
      
      let newArr = timeSlot.slice(0,newLength)
      this.setState({daysData:newArr})
    
      //console.log(this.state.daysData)
  }


// Check to database
  checkDb = (timeSlot,db) => {
    let arr1 = timeSlot.filter(val => !db.includes(val));
    //console.log(arr1)
    this.setState({daysData:arr1})
    
  }

  checkDate = (data,duration,timeSlot,db) => {
   
    if ((data.day.length) === 0){
      console.log(data.day)
        
        this.checkTimeSlot(timeSlot,duration)
        //console.log(this.state.daysData)
      
      } else {
     this.checkDb(timeSlot,db)
     //console.log(this.state.daysData)
   }

  }
  selectBooking (day,month,year) {
            const token = localStorage.getItem('token');

      let config = {
          headers: { 'Content-Type':'application/json', 'Authorization':'Bearer '+token  },
        }   
  axios.get(url+'/dates/' + day + "/"  +month + "/" + year, config )
        .then( (res) => {       


          if (this.state.day === null) {

            this.setState({day: 0, month: 0, year: 0})
          }  else {
          
          this.setState({day:this.state.day, month:this.state.month, year: this.state.year})
           const times = res.data.day.map(day => day)
            console.log('times', times)
            const t = times.map( d => d)


            if ( times.length > 0) { 
            const time = t[0].time.time
            console.log('time', time)
            this.setState({used: time})
                    // let duration = this.props.match.params.serviceDuration

        // let db = [this.state.used]     
       const used = [this.state.used]        
       let timesAll = [9,9.30,10,10.30,11,11.30,12,12.30,13,13.30,14,14.30,15,15.30,16,
                        16.30,17,17.30,18,18.30,19,19.30,20,21]

      const timeSlot = timesAll.filter((times) => {
        return used.indexOf(times) === -1;
      });

                  this.setState({daysData: timeSlot})

             } 

             else { 
                    let duration = this.props.match.params.serviceDuration

      let db = [this.state.used]     
       const used = [this.state.used]        
       let timesAll = [9,9.30,10,10.30,11,11.30,12,12.30,13,13.30,14,14.30,15,15.30,16,
                        16.30,17,17.30,18,18.30,19,19.30,20,21]

      const timeSlot = timesAll.filter((times) => {
        return used.indexOf(times) === -1;
})
              const time = [] 
               console.log('time', time)
              this.setState({used: time})
                this.checkDate(res.data,duration,timeSlot,db) 
            }
        }
})         
        .catch(error => console.log('FORM COULD NOT GET', error))
         
        
    if (day !== undefined) {
    this.setState({
      
      day: day,
       month: month,
        year: year,
      available: "Available Timeslot :"

    })
  } else {
    this.setState({
      day: 0,
      month: 0,
      year: 0,
      available: "Available Timeslot :"

    })
  }
}

  
// function to pick the date in calendar
  onDatePicked = (d) => {

          // let duration = this.props.match.params.serviceDuration
          let date = new Date(d);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let timeUsed = this.state.used;
          this.selectBooking(day,month,year);
          
          console.log(timeUsed)
      

      }                
     





  
  

  

  render() {
  
 console.log(this.state.daysData) 
    return (
    <Row style={{margin: 20, alignItems: 'center'}}>
   
      
      <Col>
      <Calendar
        accentColor={'green'}
        orientation={'flex-col'}
        showHeader={false}
        onDatePicked = {(d) => {
          this.onDatePicked(d)
        }}
      />
      </Col>
      
      
      <Col isOpen={this.state.collapse}>
          <BookInfo
          timeslot = {this.state.daysData}
          day= {this.state.day}
          month= {this.state.month}
          year= {this.state.year}
          available= {this.state.available}
          duration= {this.props.match.params.serviceDuration}
          productName = {this.props.match.params.serviceName}
          price = {this.props.match.params.servicePrice}
          _id = {this.props.match.params.serviceId}
          />
      </Col>
     </Row>
    );
  }
}



export default withRouter(BookCal);
