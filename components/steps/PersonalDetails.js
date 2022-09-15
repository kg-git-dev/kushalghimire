import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button, Message } from 'semantic-ui-react';

import detectEthereumProvider from '@metamask/detect-provider'

 
class PersonalDetails extends Component {
  state = {
    errorMessage: ''
  }

  saveAndContinue = async (e) => {
    this.setState({ errorMessage: "" });
    const provider = await detectEthereumProvider();
    console.log(provider);

    if (provider) {

      this.props.nextStep();
    
      const chainId = await provider.request({
        method: 'eth_chainId',
      })
      console.log(chainId);
    } else {
    
      // if the provider is not detected, detectEthereumProvider resolves to null
      this.setState({errorMessage: 'Please activate metamask'})

    }
  }
 
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }
 
  render() {
    const { values } = this.props;

    const { values: { subscriberIp, subscriberName, subscriberCountry } } = this.props;
  
 
    return (
      <div>
        <Grid.Column>
          <Header textAlign='center'>
            <h1>My journey so far</h1>
          </Header>
  
          <Form error={!!this.state.errorMessage}>
            <Segment>
              <div>
                Hello {subscriberName} from {subscriberCountry}.
                <br />
                In web 1.0 I was building card games and static html sites for experimentation.
                In web 2.0 I built multiple companies using wordpress and javascript/jquery.
                In web 3.0 I have built a demonstration. 
                This basically feeels like a third inning and like in Baseball I believe I have a few more innings left in me. 
              </div>
            </Segment>
  
            <Segment textAlign='center'>
              <Button onClick={this.back}>Back</Button>
  
              <Button onClick={this.saveAndContinue}>Save And Continue</Button>
              <Message error header="Oops!" content={this.state.errorMessage} />
            </Segment>
          </Form>
        </Grid.Column>
      </div>
    )
  }
}
 
export default PersonalDetails; 