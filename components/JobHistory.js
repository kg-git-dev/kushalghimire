import React, { Component } from 'react';
import HistoryIndicator from './historySteps/HistoryIndicator';
import CaldwellUniversity from './historySteps/CaldwellUniversity';
import BlueMonkeyVapes from './historySteps/BlueMonkeyVapes';
import LiveReporting from './historySteps/LiveReporting';
import LexpertEase from './historySteps/Lexpertease';
import WebPointSolutions from './historySteps/WebpointSolutions';
 
class JobHistory extends React.Component {  
  state = {
    step: 'caldwell'
  }

  caldwellStep = () => {
    this.setState({
      step: 'caldwell'
    })
  }

  liveReportingStep = () => {
    this.setState({
      step: 'liveReporting'
    })
  }

  blueMonkeyStep = () => {
    this.setState({
      step: 'blueMonkey'
    })
  }

  lexperteaseStep = () => {
    this.setState({
      step: 'lexpertease'
    })
  }

  webpointStep = () => {
    this.setState({
      step: 'webpoint'
    })
  }


   
  render() {
    const { step } = this.state;
 
    switch(step) {
      case 'caldwell':
        return (
          <div>
              <div class="ui grid">
                <div class="four wide column">
                <HistoryIndicator
                    caldwellStep={this.caldwellStep}
                    lexperteaseStep={this.lexperteaseStep} 
                    liveReportingStep={this.liveReportingStep}
                    blueMonkeyStep={this.blueMonkeyStep}    
                    webpointStep={this.webpointStep}         
                    step={step}/>     
                  </div>
                <div class="twelve wide column">
                  <CaldwellUniversity />
                </div>
                </div>
        </div>
      );

      case 'blueMonkey':
        return (
          <div>
              <div class="ui grid">
                <div class="four wide column">
                <HistoryIndicator
                    caldwellStep={this.caldwellStep}
                    lexperteaseStep={this.lexperteaseStep} 
                    liveReportingStep={this.liveReportingStep}
                    blueMonkeyStep={this.blueMonkeyStep}    
                    webpointStep={this.webpointStep}         
                    step={step}/>     
                  </div>
                <div class="twelve wide column">
                  <BlueMonkeyVapes />
                </div>
                </div>
        </div>
        );

      case 'liveReporting':
        return (
          <div>
              <div class="ui grid">
                <div class="four wide column">
                <HistoryIndicator
                    caldwellStep={this.caldwellStep}
                    lexperteaseStep={this.lexperteaseStep} 
                    liveReportingStep={this.liveReportingStep}
                    blueMonkeyStep={this.blueMonkeyStep}    
                    webpointStep={this.webpointStep}         
                    step={step}/>        
                  </div>
                <div class="twelve wide column">
                  <LiveReporting />
                </div>
                </div>
        </div>
          );

        case 'lexpertease':
          return (
            <div>
              <div class="ui grid">
                <div class="four wide column">
                <HistoryIndicator
                    caldwellStep={this.caldwellStep}
                    lexperteaseStep={this.lexperteaseStep} 
                    liveReportingStep={this.liveReportingStep}
                    blueMonkeyStep={this.blueMonkeyStep}    
                    webpointStep={this.webpointStep}         
                    step={step}/>      
                  </div>
                <div class="twelve wide column">
                  <LexpertEase />
                </div>
              </div>
      </div>
          );

      case 'webpoint':
        return (
          <div>
              <div class="ui grid">
                <div class="four wide column">
                <HistoryIndicator
                    caldwellStep={this.caldwellStep}
                    lexperteaseStep={this.lexperteaseStep} 
                    liveReportingStep={this.liveReportingStep}
                    blueMonkeyStep={this.blueMonkeyStep}    
                    webpointStep={this.webpointStep}         
                    step={step}/>     
                  </div>
                <div class="twelve wide column">
                  <WebPointSolutions />
                </div>
                </div>
        </div>
          );
    }
  }
}
 
export default JobHistory;