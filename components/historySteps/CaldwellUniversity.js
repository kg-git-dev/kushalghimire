
import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button, Message, Image } from 'semantic-ui-react';

class CaldwellUniversity extends Component {

  render() {
    const { deviceType } = this.props;

    return (
      <div>
      <div className="caldwellBio">                                        
          <div className="ui feed">
            <div className="event">
              <div className="content">
                <div className="date">
                  <div style={{color: 'blue'}}><b>January 2013 - June 2016 </b></div>
                </div>
                
                <div className="summary">
                  Caldwell University and Murphy's Law.
                </div>
                <div className='experiment'>
                  <div className="extra text">
                    The VP of Technology at Caldwell University on his first intro asked if I had ever heard of Murphy's Law. I had, in fact, not.
                    <br/>My first professional experience transitioned from white collar to blue as I transitioned from logging tech support requests to handling lights and sound for major Univeristy Events. I also played supporting roles in events' live streaming. 
                    <br />The experience taught me real life skills as I was solo operating a 200 person auditorioum and handling lights and sound board. This came with major responsibilities for event success and hence the VP's wise words to stay on your toes. 
                    <div class="ui grid">
                      <div class={`${deviceType == 'desktop' ? 'eleven':'nine'} wide column`}>
                      <br /><b>One Lesson:</b>
                      <br /> - Anticipate the worst because like Forrest said 's**t happens!'. 
                      <br /><br /><b>Many Responsbilities:</b>
                      <br />- Troubleshooting hardware and software solutions for 120 faculty and staff. 
                      <br />- Stage and sound management for various University events on and off campus.
                      <br />- Trained new hires and supervised junior personnels.
                      </div>
                      
                      <div class={`${deviceType == 'desktop' ? 'five':'seven'} wide column`}>
                        <br />
                        <div class="ui vertical fluid mini steps">
                          <div class="step">
                            <div class="content">
                              <div class="title" style={{color: 'blue'}}>IT Support Associate</div>
                              <div class="description">January 2013</div>
                            </div>
                          </div>
                          <div class="step">
                          <div class="content">
                              <div class="title" style={{color: 'blue'}}>IT Technician</div>
                              <div class="description">June 2013</div>
                            </div>
                          </div>
                          <div class="step">
                            <div class="content">
                              <div class="title" style={{color: 'blue'}}>Senior IT Technician</div>
                              <div class="description">January 2015 </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {deviceType == 'mobile' ? <br/> : ''}
                  <div className="extra images">
                    <Image src="halloween_square.png" />
                    <Image src="blacknwhite.jpg" />
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
        </div>
    );
  }
}
 
export default CaldwellUniversity;