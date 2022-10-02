import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class Indicator extends Component {

  render() {
    const { deviceType } = this.props;
    const { currentStep } = this.props;

    return (
      <div>
        {deviceType == 'desktop' ? <div className="ui tablet fluid tiny steps">
          <div className={`${currentStep === 'first' ? 'active' : 'disabled'} step`}>
            <i className="handshake icon"></i>
            <div className="content">
              <div className="title">Namaste !</div>
              <div className="description">It's nice to e-meet you :)</div>
            </div>
          </div>
          <div className={`${currentStep === 'second' ? 'active' : 'disabled'} step`}>
            <i className="space shuttle icon"></i>
            <div className="content">
              <div className="title">Web3</div>
              <div className="description">Project Intro</div>
            </div>
          </div>
          <div className={`${currentStep === 'third' ? 'active' : 'disabled'} step`}>
            <i className="car icon"></i>
            <div className="content">
              <div className="title">KG Motors</div>
              <div className="description">Finance your dream car at KG Motors</div>
            </div>
          </div>
        </div> : ''}

      </div>
    );
  }
}

export default Indicator;