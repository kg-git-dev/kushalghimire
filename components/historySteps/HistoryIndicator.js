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
                <div class="ui vertical fluid mini steps">
                  <div class={`${this.props.step == 'caldwell'?'active':''} step link `} onClick={e => this.setCaldwell(e)} >
                      <div class="content">
                      <div class="title">Caldwell University</div>
                      <div class="description">and Intro to Murphy's Law.</div>
                      </div>
                  </div>
                  <div class={`${this.props.step == 'blueMonkey'?'active':''} step link `} onClick={e => this.setBluemonkey(e)} >
                      <div class="content">
                      <div class="title">Blue Monkey Vapes</div>
                      <div class="description">and Almost Famous</div>
                      </div>
                  </div>
                  <div class={`${this.props.step == 'liveReporting'?'active':''} step link `} onClick={e => this.setLivereporting(e)} >
                      <div class="content">
                      <div class="title">LiveReporting LLC.</div>
                      <div class="description">and Job's Spirit.</div>
                      </div>
                  </div>
                  <div class={`${this.props.step == 'lexpertease'?'active':''} step link `} onClick={e => this.setLexpertease(e)} >
                      <div class="content">
                      <div class="title">LexpertEase</div>
                      <div class="description">and The Cheat Code</div>
                      </div>
                  </div>
                  <div class={`${this.props.step == 'webpoint'?'active':''} step link `} onClick={e => this.setWebpoint(e)} >
                      <div class="content">
                      <div class="title">Webpoint Solutions</div>
                      <div class="description">and The Great Pivot</div>
                      </div>            
                </div>
            </div>
        </div>
    );
  }
}
 
export default HistoryIndicator;