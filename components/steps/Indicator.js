import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';
 
class Indicator extends Component {

  render() {
 
    const { currentStep: { currentStep } } = this.props;

    return (
        <div>
        <div className="ui fluid tiny steps">
          <div className={`${this.props.currentStep === 'first' ? 'active':'disabled'} step`}>
            <i className="truck icon"></i>
            <div className="content">
              <div className="title">Namaste</div>
              <div className="description">Pleasure to introduce.</div>
            </div>
          </div>
          <div className={`${this.props.currentStep === 'second' ? 'active':'disabled'} step`}>
            <i className="payment icon"></i>
            <div className="content">
              <div className="title">Web3</div>
              <div className="description">Let's start with the demonstration. </div>
            </div>
          </div>
          <div className={`${this.props.currentStep === 'third' ? 'active':'disabled'} step`}>
            <i className="info icon"></i>
            <div className="content">
              <div className="title">Welcome</div>
              <div className="description">Welcome to KG Motors.</div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}
 
export default Indicator;