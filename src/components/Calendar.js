import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Calendar from 'react-calendar-material';

const Cal = () => {
  
  return (
    
    
    <div className='board'><Calendar
    accentColor={'red'}
    orientation={'flex-col'}
    showHeader={false}
    onDatePicked={(d) => {
      var date = new Date(d);
      var day = date.getDate();
      var year = date.getFullYear();
      var month = date.getMonth() + 1
      //var time = date.getHours()
      var arr = [year,month,day]
      console.log("month:", month);
      console.log("day:", day);
      console.log(year)
      //console.log(time)
      console.log(arr)
    }}/></div>
    
  );
};

export default Cal;
