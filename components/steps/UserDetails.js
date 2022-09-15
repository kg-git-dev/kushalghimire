import React, { Component, useState } from 'react';
import { Grid, Header, Segment, Form, Button, Message } from 'semantic-ui-react';
import axios from 'axios'; 
import detectEthereumProvider from '@metamask/detect-provider'

class UserDetails extends Component {
  state = {
    errorMessage: '',
    provider: ''
  }

  async componentDidMount() {
    const provider = await detectEthereumProvider();
    this.setState({provider: provider});
  }

  saveAndContinue = async (e) => {
    e.preventDefault();
    this.setState({ errorMessage: "" });
    if (this.state.provider) {
      const res = await axios.get('https://geolocation-db.com/json/');
      const subsriberIp = res.data.IPv4;
      const subscriberCountry = res.data.country_name;
      this.props.setSubscriberIp(subsriberIp, subscriberCountry);
      this.props.nextStep();
  
    } else {
      this.setState({errorMessage: 'Please activate metamask'})
    }
  }
 
  render() {
    const { values } = this.props;

    return (
            <div> 
        
              <Grid.Column>
                <Header textAlign='center'>
                  <h2>KNOCK! KNOCK!</h2>
                </Header>
        
                <Form error={!!this.state.errorMessage}>
                  <Segment>
                    <Form.Field>
                      <label>Namaste! This is Kushal Ghimire. Who's there?</label>
                        <div className="two fields">
                          <div className={`${this.state.provider ? 'active':'disabled'} field`}>
                            <input
                              placeholder='Name'
                              onChange={this.props.handleChange('subscriberName')}
                              defaultValue={values.subscriberName}
                            />
                          </div>
                          </div>
                    </Form.Field>
                  </Segment>
    
                  <Segment>
                    <Button onClick={this.saveAndContinue} className={`${this.state.provider ? 'active':'disabled'} field`}>Save And Continue</Button>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                  </Segment>
                </Form>
              </Grid.Column>
            </div>
    );
  }
}
 
export default UserDetails;