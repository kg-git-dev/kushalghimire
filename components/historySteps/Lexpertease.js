
import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button, Message, Image, Link } from 'semantic-ui-react';


class LexpertEase extends Component {


  render() {

    return (
      <div>
        <div className="lexpertEaseBio">
          <div className="ui feed">
            <div className="event">
              <div className="content">
                <div className="date">
                  <div style={{ color: 'blue' }}><b>February 2020 - August 2020, CTO.</b></div>
                </div>
                <div className="summary">
                  Lexpertease and The Cheat Code.
                </div>
                <div className='experiment'>
                  <div className="extra text">
                    I was offered an opportunity to lead the technology wing of a commercial law firm in Nepal. Analysis documented negligible online presence of competition i.e. other law firms and hence suggested the possibility of "rocking the boat" with a concrete entry strategy.
                    <br />My strategy for market entry was "divorce cases". A quick look up in google trend showed incrementally increasing search volume on divorce process. The legal team wrote a lengthy, detailed article on the process of getting divorced and we quickly started dominating the search rankings. Also, since we were first to make entry, google ad words with target of phone calls had unbelievably cheap pricing and led to frequent inbound leads.
                    <br />
                    <br />The legal landscape in Nepal has now largely changed and this can partly be attributed to Lexperteases' loud and impactful entry into Nepal's legal technology market.
                    <div className="ui grid">
                      <div className="sixteen wide column">
                        <br /><b>One Lesson:</b>
                        <br /> - First entry advantage is quantifiable.
                        <br /><br /><b>Many Responsbilities:</b>
                        <br />- Executed geo targeted content marketing.
                        <br />- Designed, developed and deployed multiple web solutions for the corporations' portfolio companies.
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


export default LexpertEase;