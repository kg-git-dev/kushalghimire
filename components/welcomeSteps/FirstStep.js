import React, { Component, useState } from 'react';
import { Grid, Segment, Form, Button, Message, Image, Divider, Step, Icon } from 'semantic-ui-react';
import axios from 'axios'; 
import detectEthereumProvider from '@metamask/detect-provider'
import HistoryIndicator from '../historySteps/HistoryIndicator';
import JobHistory from '../JobHistory';

class FirstStep extends Component {
  state = {
    subscribeWarning: '',
    responseCounter: 1,
    provider: '',
    loading: false,
  }

  async componentDidMount() {
    const provider = await detectEthereumProvider();
    this.setState({provider: provider});
  }

  saveAndContinue = async (e) => {
    e.preventDefault();
    if (this.state.provider) {
      if (this.state.responseCounter == 1 && !this.props.values.subscriberName) {
        this.state.responseCounter++;
        this.setState({subscribeWarning: 'I would love to put a face to whoever decided to click Next. If you would like to skip, press Next again.'});
      } else {
        this.setState({ loading: true });
        const res = await axios.get('https://geolocation-db.com/json/');
        console.log(res.data);
        const subsriberIp = res.data.IPv4;
        const subscriberCountry = res.data.country_name;
        this.props.setSubscriberIp(subsriberIp, subscriberCountry);
        this.setState({loading: false})
        this.props.nextStep();
      }
    } 
  }
 
  render() {

    const { values } = this.props;

    return (
            <div> 
              <Grid.Column>        
                <Form warning={!!this.state.subscribeWarning}>
                      <div class="ui segment">
                        <h1 class="ui block header">
                        Hello there! This is <span style={{color : '#4183c4'}}>Kushal Ghimire.</span>
                        <div class="sub header">Web SEO and Technical Marketing.</div>
                      </h1>
                        <div class="ui feed">
                        <div class="event">
                          <div class="content">
                            <div class="summary">
                              I specialize in analyzing the market to identify openings, and thereafter design, develop and deploy technical solutions for entry and traction. This can include major operational decisions such as offering wholesale services as on online retailer and setting up the technological infrastructure to support it. 
                              <i> (I help companies scale).</i></div>
                              <div class="extra text">Welcome to <a>kushalghimire.com</a>. This website is developed using react frontend connected via web3 to solidity developed ethereum blockchain network. The first page details some of my professional achievements while starting second page is a web3 and blockchain demonstration. The site is aimed to be interactive and informative about not just me but about the advantages of the web3 and blockchain technology in general. The project - KG Motors is aimed to demonstrate technical marketing in action. An auto mobile dealership can likely run a sustainable business by executing the proposed business model and technical stack. Hope you find the experience interesting. Thank you for visiting! 
                              <br/><br/>
                              <i className="envelope icon"></i> <a href="mailto:ghimire.kushal@ymail.com">ghimire.kushal@ymail.com</a>
                              </div>    
                          </div>
                        </div>                        
                            <Divider />
                            <br />
                            <JobHistory />
                          </div>
                      </div>
                    <br/>
                    <div class="column">
                      <div class="ui segment">
                        <a class="ui gray ribbon label">Overview</a>
                        <span>Project Details</span>
                        <div class="summary">
                          <br/>
                              <b>Before starting the project I had general knowledge of the blockchain technology via news articles. However, I was unclear on how monetary value is being assigned to a particular crypto. (<i>Who sets it, what are the basis for evaluation?</i>) Turns out the answer was pretty straightforward. It's all about "Computing Power".
                                </b>
                                <div>
                                  <br />
                                  SHA256 is a cryptographic hash function that allows any data to be encrypted into 64 digits. We could type in and encrypt the entire Song of Ice and Fire saga into 64 digits and decrypt it with any computer. Blockchain tachnology is based on top of this core idea. 
                                  <br />In a blockchain, a number (nonce) is encrypted along with the data and the resulting SHA256 hash recorded in the network. Blockchains protocol requires the nonce to be a number such that the numerical equivalency of the resulting 64 digit SHA256 hash is less than a certain value. In order to identify the correct nonce, computers have to iterate over thousands of values until it resolves the correct nonce attached to the particular data. This, as we can imagine, consumes computing power and time. However, this ensures that every record is unique and immutable as altering the data will require a new nonce to be declared to satisfy the blockchain protocols.
                                  <br />In order to solve for nonce and successfuly record a transaction into the blockchain network, users source processing powers from computers connected to the network. Since, computer requires electricity and electricity costs money, the computers providing processing power are compensated with "gas fees". Gas fees is determined by supply and demand. This is where it clicked for me. We could equate the cost for recording a transaction with electricity units consumed. Thus, assigning a value to cryptocurrency makes much more sense since solving for "nonce" requires monetary but variable contribution depending on supply and demand. 
                                  <div>
                                  <br/>
                                  <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">DONWLOAD METAMASK HERE</a>
                                  </div>
                                </div>
                              </div>
                              
                        <Form.Field>
                        <br/> 
                      <label>Namaste! This is Kushal Ghimire. Who's there?</label>
                      <br />
                        <div className="two fields">
                          <div className={`${this.state.provider ? 'active':'disabled'} field`}>
                            <input
                              placeholder='Name'
                              onChange={this.props.handleChange('subscriberName')}
                              defaultValue={values.subscriberName}
                            />
                          </div>
                          </div>

                            <div><Button onClick={this.saveAndContinue} loading={this.state.loading} className={`${this.state.provider ? '':'disabled'} ui right labeled icon positive field button`} ><i class="right arrow icon"></i>
                              Continue</Button>
                            <Message warning header="Please share your online identity :)" content={this.state.subscribeWarning} />
                            </div>
                    </Form.Field>
                      </div>
                    </div>
                </Form>
                <br /> <br />
              </Grid.Column>
            </div>
    );
  }
}
 
export default FirstStep;