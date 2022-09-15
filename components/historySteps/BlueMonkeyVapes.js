
import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button, Message, Image } from 'semantic-ui-react';
 
class BlueMonkeyVapes extends Component {


  render() {

    return (
      <div>
      <div className="blueMonkeyBio">                                    
        <div className="ui feed">
          <div className="event">
            <div className="content">
              <div className="date">
                <div style={{color: 'blue'}}><b>April 2015 - September 2019 </b></div>
              </div>
              <div className="summary">
                Blue Monkey Vapes and Almost Famous
              </div>
              <div className='experiment'>
                <div className="extra text">
                  In 2019, the vaping industry was taken over by a storm as there were reports of <a href="https://www.cdc.gov/tobacco/basic_information/e-cigarettes/severe-lung-disease.html">outbreak of lung injuries</a> induced via vaping. 
                  <br />The backlash was fierce. Although, the outbreak was caused by use of modified marijuana cartidges, the details seldom matter in cases of public outrage. Eventually, Blue Monkey Vapes suffered major losses and shut down multiple locations. A fate shared by other businesses in the vaping industry. 
                  <div class="ui grid">
                    <div class="eleven wide column">
                    <br /><b>One Lesson:</b>
                    <br /> - The statement "There is no such thing as a bad publicity" is arguably incorrect. 
                    <br /><br /><b>Many Responsbilities:</b>
                    <br />- Designed, developed and deployed flagship company website : bluemonkeyvapes.com & lost8s.com.
                    <br />- Lead the search engine optimization team.
                    <br />- Designed, developed and deployed multiple web solutions for the corporations' portfolio companies.
                    <br />- Managed company's retail headquarters.
                    <br />- Consistently exceeded goals in key metrics, such as sales, profit, and customer service.
                    <br />- Hired, scheduled, trained and coached junior sales associates.
                    <br/><br />
                    <div className="extra images">
                    <Image src="bmv_store.png" />
                    <Image src="bmv_slogan.png" />
                  </div>
                    </div>
                    
                    <div class="five wide column">
                      <br />
                      <div class="ui vertical fluid mini steps">
                        <div class="step">
                          <div class="content">
                            <div class="title" style={{color: 'blue'}}>Sales Associate</div>
                            <div class="description">April 2015</div>
                          </div>
                        </div>
                        <div class="step">
                        <div class="content">
                            <div class="title" style={{color: 'blue'}}>Assistant Manager</div>
                            <div class="description">Sep 2015</div>
                          </div>
                        </div>
                        <div class="step">
                          <div class="content">
                            <div class="title" style={{color: 'blue'}}>Store Manager</div>
                            <div class="description">April 2016 </div>
                          </div>
                        </div>
                        <div class="step">
                          <div class="content">
                              <div class="title" style={{color: 'blue'}}>App and Web Contractor</div>
                              <div class="description">October 2016 </div>
                            </div>
                        </div>
                        <div class="step">
                          <div class="content">
                            <div class="title" style={{color: 'blue'}}>Online Business Manager</div>
                            <div class="description">June 2017 </div>
                          </div>
                        </div>
                        <div class="step">
                          <div class="content">
                            <div class="title" style={{color: 'blue'}}>Web Contrator</div>
                            <div class="description">September 2020 </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
 
export default BlueMonkeyVapes;