import React, { Component } from 'react';
import FirstStep from './welcomeSteps/FirstStep';
import SecondStep from './welcomeSteps/SecondStep';
import ThirdStep from './welcomeSteps/ThirdStep';
import Indicator from './welcomeSteps/Indicator';
import CyberTruck from './CyberTruck';

class WelcomeMultiStep extends React.Component {  
  state = {
    step: 1,
    subscriberName: '',
    subscriberIp: '',
    subscriberCountry: ''
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
 
  handleChange = input => event => {
    this.setState({[input]: event.target.value})
  }
   
  render() {
    const { step } = this.state;
    const {subscriberName, subscriberIp, subscriberCountry} = this.state;
    const values = {subscriberName, subscriberIp, subscriberCountry};
 
    switch(step) {
      case 1:
        return (
          <div>
            <Indicator 
              currentStep="first"/>
              <br/>
            <FirstStep
                  nextStep={this.nextStep} 
                  handleChange = {this.handleChange}
                  setSubscriberIp={this.setSubscriberIp}  
                  values={values}                           
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
                <SecondStep
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
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
                  <ThirdStep
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                  />
                </div>
          );
      default:
        return (
        <div>
        </div>
        );
    }
  }
}
 
export default WelcomeMultiStep;