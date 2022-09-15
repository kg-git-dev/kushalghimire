import React, { Component } from 'react';
import UserDetails from './steps/UserDetails';
import PersonalDetails from './steps/PersonalDetails';
import Confirmation from './steps/Confirmation';
import Success from './steps/Success';
import Indicator from './steps/Indicator';

// import IpInfo from './steps/IpInfo';
 
class MultiStep extends React.Component {  
  state = {
    step: 1,
    subscriberName: '',
    subscriberIp: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    city: '',
    country: ''
  }

  setSubscriberIp = (subscriberIp, subscriberCountry) =>  {
    this.setState({
      subscriberIp: subscriberIp,
      subscriberCountry: subscriberCountry
  }) 
  }


  nextStep = () => {
    const { step } = this.state
    this.setState({
      step : step + 1
    })
  }
 
  prevStep = () => {
    const { step } = this.state
    this.setState({
      step : step - 1
    })
  }
 
  handleChange = input => event => {
    this.setState({[input]: event.target.value})
  }


   
  render() {
    const { step } = this.state;
    const {subscriberName, subscriberIp, subscriberCountry, firstName, lastName, email, age, city, country } = this.state;
    const values = {subscriberName, subscriberIp, subscriberCountry, firstName, lastName, email, age, city, country, step };
 
    switch(step) {
      case 1:
        return (
          <div>
            <Indicator 
              currentStep="first"/>
            <br />
            <UserDetails
                  nextStep={this.nextStep} 
                  handleChange = {this.handleChange}
                  values={values}
                  setSubscriberIp={this.setSubscriberIp}            
                />
        </div>
      );

      case 2:
        return (
              <div>
                <Indicator 
                      currentStep="second"
                      />
                <br />
                <PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    values={values}
                  />
                </div>
        );

      case 3:
        return (
                <div>
                  <Indicator 
                    currentStep="third"
                    />
                  <br />
                  <Confirmation
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                  />
                </div>
          );
      case 4:
        return (
        <div>
          <Indicator 
            currentStep="fourth"
            />          
          <Success />
        </div>
        );
    }
  }
}
 
export default MultiStep;