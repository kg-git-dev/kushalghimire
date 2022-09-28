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
    const { deviceType } = this.props;

    switch (step) {
      case 'caldwell':
        return (
          <div>
            {deviceType == 'desktop' ? <div className="ui grid">
              <div className="four wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="twelve wide column">
                <CaldwellUniversity deviceType={deviceType}/>
              </div>
            </div> :<div className="ui grid">
              <div className="sixteen wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="sixteen wide column">
                <CaldwellUniversity deviceType={deviceType}/>
              </div>
            </div>}


          </div>
        );

      case 'blueMonkey':
        return (
          <div>
            {deviceType == 'desktop' ? <div className="ui grid">
              <div className="four wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="twelve wide column">
                <BlueMonkeyVapes deviceType={deviceType}/>
              </div>
            </div> :<div className="ui grid">
              <div className="sixteen wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="sixteen wide column">
                <BlueMonkeyVapes deviceType={deviceType}/>
              </div>
            </div>}

          </div>
        );

      case 'liveReporting':
        return (
          <div>
           {deviceType == 'desktop' ? <div className="ui grid">
              <div className="four wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="twelve wide column">
                <LiveReporting deviceType={deviceType}/>
              </div>
            </div> :<div className="ui grid">
              <div className="sixteen wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                  />
              </div>
              <div className="sixteen wide column">
                <LiveReporting deviceType={deviceType} />
              </div>
            </div>}

          </div>
        );

      case 'lexpertease':
        return (
          <div>
            {deviceType == 'desktop' ? <div className="ui grid">
              <div className="four wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="twelve wide column">
                <LexpertEase deviceType={deviceType}/>
              </div>
            </div> :<div className="ui grid">
              <div className="sixteen wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="sixteen wide column">
                <LexpertEase deviceType={deviceType}/>
              </div>
            </div>}

          </div>
        );

      case 'webpoint':
        return (
          <div>
            {deviceType == 'desktop' ? <div className="ui grid">
              <div className="four wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="twelve wide column">
                <WebPointSolutions deviceType={deviceType}/>
              </div>
            </div> :<div className="ui grid">
              <div className="sixteen wide column">
                <HistoryIndicator
                  caldwellStep={this.caldwellStep}
                  lexperteaseStep={this.lexperteaseStep}
                  liveReportingStep={this.liveReportingStep}
                  blueMonkeyStep={this.blueMonkeyStep}
                  webpointStep={this.webpointStep}
                  step={step}
                   />
              </div>
              <div className="sixteen wide column">
                <WebPointSolutions deviceType={deviceType} />
              </div>
            </div>}

          </div>
        );
    }
  }
}

export default JobHistory;