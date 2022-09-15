import React, { Component, useState } from 'react';
import { Grid, Segment, Form, Button, Message, Image, Divider, Step, Icon } from 'semantic-ui-react';
import axios from 'axios'; 
import detectEthereumProvider from '@metamask/detect-provider'
import HistoryIndicator from '../historySteps/HistoryIndicator';
import JobHistory from '../JobHistory';

class FirstStep extends Component {
  state = {
    errorMessage: '',
    provider: '',
    loading: false,
    testingValue: ''
  }

  async componentDidMount() {
    const provider = await detectEthereumProvider();
    this.setState({provider: provider});
  }

  saveAndContinue = async (e) => {
    e.preventDefault();
    this.setState({ errorMessage: "", loading: true });

    if (this.state.provider) {
      console.log('testing');
      const res = await axios.get('https://geolocation-db.com/json/');
      console.log(res.data);
      const subsriberIp = res.data.IPv4;
      const subscriberCountry = res.data.country_name;
      this.props.setSubscriberIp(subsriberIp, subscriberCountry);
      this.setState({loading: false})
      this.props.nextStep();
  
    } else {
      this.setState({errorMessage: 'Please activate metamask', loading: false})
    }
  }
 
  render() {

    const { values } = this.props;

    return (
            <div> 
              <Grid.Column>        
                <Form error={!!this.state.errorMessage}>
                      <div class="ui raised segment">
                        <a class="ui teal ribbon label">My Career Highlights</a>
                        <span></span>
                        <h1 class="ui header">
                        <p>Hello there! This is <span style={{color : '#4183c4'}}>Kushal Ghimire.</span></p>
                        <div class="sub header">Web SEO and Technical Marketing.</div>
                      </h1>
                        <div class="ui feed">
                        <div class="event">
                          <div class="content">
                            <div class="summary">
                              I specialize in analyzing the market to identify openings, and thereafter design, develop and deploy technical solutions for entry and traction. This can include major operational decisions such as offering wholesale services as on online retailer and setting up the technological infrastructure to support it.</div>
                              <div class="extra text">Welcome to <a>kushalghimire.com</a>. This website is developed using react frontend connected via web3 to solidity developed blockchain network. The first page details some of my professional achievements while starting second page is a web3 and blockchain demonstration. The site is aimed to be interactive and informative about not just me but about the advantages of the web 3 and blockchain network. The project - KG Motors is aimed to demonstrate technical marketing in action. A auto mobile dealership can most likely run a sustainable business by executing the proposed business model and technical stack. Hope you find the experience interesting. Thank you for visiting! 
                              <br/><br/>
                              <i className="envelope icon"></i> <a>ghimire.kushal@ymail.com</a>
                              </div>    
                          </div>
                        </div>                        
                            <Divider />
                            {/* <Stages /> */}
                            <br />
                            <JobHistory />
                          </div>
                      </div>
                    <br/>
                    <div class="column">
                      <div class="ui raised segment">
                        <a class="ui gray ribbon label">Overview</a>
                        <span>Next Steps</span>
                      <Form.Field>
                        <br/>
                        <div>
                          Before researching for the project I had just basic ideas about the blockchain network. My bigeest curosity was on the fact that how are they actually assigned an equivalent monetary value. What are they actually offering?
                          <br/>Basically, a genius created an algorithm that could encrypt any form of data into 256 digits. The existence of a contract is available for everyone to see but the data inside can only be accessed with decryption keys. The catch here is you can encrypt any type of data but the more complex the data type is, the more costly the decryption process is going to be.
                          <br/>You see, basically we are solving a very complex math problem to decrypt data. The more complicated the probelm gets the more computing power it requires. Even pocket calculator take batteries. As such, in blockchain when we are trying to access a contract, we require computing power to solve our problem. We then specify how much money we are willing to pay to decrypt this blockchan. This is where real monetary value comes in. We are using computer, computers need electricity. Electricity cost money. The more poeople in the network, the cheaper it is going to be since supply and demand. 
                          <br/>This was my first 'aha' moment while researching on blockchain. I will try to share similar tidbits throughout the site.
                        </div>
                        <div>
                          For the purpose of this project, it is essential you install metamask. Since every data change in blockchain costs real money, it makes sense to use blockchain for this product.  
                        </div>
                      <label>Namaste! This is Kushal Ghimire. Who's there?</label>
                        <div className="two fields">
                          <div className={`${this.state.provider ? 'active':'disabled'} field`}>
                            <input
                              placeholder='Name'
                              onChange={this.props.handleChange('subscriberName')}
                              defaultValue={values.subscriberName}
                              testingValue={this.state.value}
                            />
                          </div>
                          </div>
                    </Form.Field>

                    <Button onClick={this.saveAndContinue} loading={this.state.loading} className={`${this.state.provider ? '':'disabled'} ui right labeled icon positive field button`} ><i class="right arrow icon"></i>
                      Continue</Button>
                    <Message error header="Oops!" content={this.state.errorMessage} />
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