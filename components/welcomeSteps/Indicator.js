import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class Indicator extends Component {

  render() {

    const { currentStep: { currentStep } } = this.props;

    return (
      <div>
        <div className="ui tablet stackable fluid tiny steps">
          <div className={`${this.props.currentStep === 'first' ? 'active' : 'disabled'} step`}>
            <i className="handshake icon"></i>
            <div className="content">
              <div className="title">Namaste !</div>
              <div className="description">It's nice to e-meet you :)</div>
            </div>
          </div>
          <div className={`${this.props.currentStep === 'second' ? 'active' : 'disabled'} step`}>
            <i className="space shuttle icon"></i>
            <div className="content">
              <div className="title">Web3</div>
              <div className="description">Project Intro</div>
            </div>
          </div>
          <div className={`${this.props.currentStep === 'third' ? 'active' : 'disabled'} step`}>
            <i className="car icon"></i>
            <div className="content">
              <div className="title">KG Motors</div>
              <div className="description">Finance your dream car at KG Motors</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Indicator;