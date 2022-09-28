
import React, { Component } from 'react';
import {Image} from 'semantic-ui-react';
 
class WebPointSolutions extends Component {


  render() {

    return (
      <div>
      <div className="webpointSolutionsBio">                            
          <div className="ui feed">
            <div className="event">
              <div className="content">
                <div className="date">
                  <div style={{color: 'blue'}}><b>February 2021 - July 2022, Head of Digital Marketing.</b></div>
                </div>
                <div className="summary">
                  Webpoint and the Great Pivot. 
                </div>
                <div className='experiment'>
                  <div className="extra text">
                    Up to this point in my digital career, I was either making all the decisions myself as CEO or consulting directly with the CEO of relevant company. In Webpoint, initially, I was more involved in a Project/Product Manager Capacity. Eventually, I did come in direct contact with clients and to the end to end business process. 
                    <br />
                    <br />The initial phases became one of the most enriching experience of my career since I had a chance to directly dabble into cutting edge technology. While I started my digital career with the development of cutting edge mobile application, the past few years, were bit of a change. I prefered wordpress for rapid development as a solo developer and its favorability to small businesses as a technical marketing consultant. My time as PM at Wepoint re-introduced me to coding and brought back a long held but inactive passion. 
                
                    <div className="ui grid">
                      <div className="sixteen wide column">
                      <br /><b>One Lesson:</b>
                      <br /> - Always include buffer time in estimates.  
                      <br /><br /><b>Many Responsbilities:</b>
                      <br />- Wrote majority of the content and worked closely with the design and development team on company's flagship website webpoint.io.
                      <br />- Identified profitable bids and wrote concrete business proposals winning tenders.
                      <br />- Lead the ideation-design-development of an in-house cyber security tool.
                      <br />- Lead the in-house team to design, develop and deploy client solutions across various verticals, including but not limited to Fintech, Healthcare, Commerce, Retail, Security and Charitable Foundations.
                      <br />- Served the role of Project Manager/Product Owner for various client projects.
                      <br />- Technical SEO consultant for diverse clientbase.
                      </div>                 
                    </div>
                  </div>
                  <br/>
                  <div className="extra images">
                    <Image src="webpoint.png" />
                    <Image src="kushal_profile_pic.png" />
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
 
export default WebPointSolutions;