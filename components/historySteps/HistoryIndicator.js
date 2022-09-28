import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button, Flag } from 'semantic-ui-react';
 
class HistoryIndicator extends Component {

  state = {
    firstActive: '',
  }

  setCaldwell = (e) => {
    e.preventDefault();
    this.props.caldwellStep();
  }

  setBluemonkey = (e) => {
    e.preventDefault();
    this.props.blueMonkeyStep();
  }
  
  setLivereporting = (e) => {
    e.preventDefault();
    this.props.liveReportingStep();
  }
  
  setLexpertease = (e) => {
    e.preventDefault();
    this.props.lexperteaseStep();
  }
  
  setWebpoint = (e) => {
    e.preventDefault();
    this.props.webpointStep();
  }
  


  render() {
    const { step }  = this.props;

    return (
        <div>                            
                <div className="ui vertical fluid mini steps">
                  <div className={`${this.props.step == 'caldwell'?'active':''} step link `} onClick={e => this.setCaldwell(e)} >
                      <div className="content">
                      <div className="title">Caldwell University</div>
                      <div className="description">and Intro to Murphy's Law.</div>
                      </div>
                  </div>
                  <div className={`${this.props.step == 'blueMonkey'?'active':''} step link `} onClick={e => this.setBluemonkey(e)} >
                      <div className="content">
                      <div className="title">Blue Monkey Vapes</div>
                      <div className="description">and Almost Famous</div>
                      </div>
                  </div>
                  <div className={`${this.props.step == 'liveReporting'?'active':''} step link `} onClick={e => this.setLivereporting(e)} >
                      <div className="content">
                      <div className="title">LiveReporting LLC.</div>
                      <div className="description">and Job's Spirit.</div>
                      </div>
                  </div>
                  <div className={`${this.props.step == 'lexpertease'?'active':''} step link `} onClick={e => this.setLexpertease(e)} >
                      <div className="content">
                      <div className="title">LexpertEase</div>
                      <div className="description">and The Cheat Code</div>
                      </div>
                  </div>
                  <div className={`${this.props.step == 'webpoint'?'active':''} step link `} onClick={e => this.setWebpoint(e)} >
                      <div className="content">
                      <div className="title">Webpoint Solutions</div>
                      <div className="description">and The Great Pivot</div>
                      </div>            
                </div>
            </div>
        </div>
    );
  }
}
 
export default HistoryIndicator;