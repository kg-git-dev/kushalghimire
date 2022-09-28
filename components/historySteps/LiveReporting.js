
import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button, Message, Image, Link } from 'semantic-ui-react';

 
class LiveReporting extends Component {


  render() {

    return (
      <div>
      <div className="liveReportingBio">                            
          <div className="ui feed">
            <div className="event">
              <div className="content">
                <div className="date">
                  <div style={{color: 'blue'}}><b>June 2016 - January 2019, Founder.</b></div>
                </div>
                <div className="summary">
                  LiveReporting LLC. and Job's Spirit.
                </div>
                <div className='experiment'>
                  <div className="extra text">
                    Spotify has had a long battle with Apple over Apple's mandate to use Apple's billing system. One of the first instances of dispute started in 2016 as documented by <a href="https://www.vox.com/2016/6/30/12067578/spotify-apple-app-store-rejection" target="_blank">this coverage from VOX in 2016.</a> 
                    <br />In late 2016, our iOS application for private lessons, 'Assignmate', was cited to violate "the business model rule" and declined ios app store entry. Assignmate used Stripe and included a mechanism for refund. Refunding while using Apple's payment system was impossible. Apple dictates 30% flat cut from initial purchase which is non refundable to the publisher. In order to issue a refund, we had to take a 30% flat loss. 
                    <br /><br />
                    In a last ditch attempt to save months worth of work, I wrote to the App Review Board at Apple one "final" time and questioned how they expected our business model to survive without a refund process. I questioned if Steve Jobs would have envisioned Apple to let a startup die despite promising app store to be a place for publisher creativity. I questioned if us trying to issue a refund really is a problem with our business model or theirs. Assignmate was approved the next day. At first, I felt invincible, later, I realized, even the giants listen. 
                    <div className="ui grid">
                      <div className="sixteen wide column">
                      <br /><b>One Lesson:</b>
                      <br /> - The ability to state your case eloquently is an underrated skill.  
                      <br /><br /><b>Many Responsbilities:</b>
                      <br />- Successfully raised seed funding.
                      <br />- Successfully lead the design, development and deployment of live streaming iOS application Cable and virtual private lesson application Assignmate. Ranked in the top 1000 in multiple countries and top 100 in a few in the iOS store.
                      <br />- Recruited technological and marketing team, and personally led the contract negotiations.
                      <br />- Designed, developed and deployed multiple projects on contractual basis. 
                      </div>                 
                    </div>
                  </div>
                  <br/>
                  <div className="extra images">
                    <Image src="livereporting.JPG" />
                    <Image src="office_space.png" />
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
 
export default LiveReporting;