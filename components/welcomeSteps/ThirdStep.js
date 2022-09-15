import React, { Component } from 'react';
import { Grid, Header, Segment, Button, List, Form, Message } from 'semantic-ui-react';
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';
import CyberTruck from '../CyberTruck';

class ThirdStep extends Component {

  state = {
    errorMessage: "",
    loading: false,
    contractAddress: ""
  };

  saveAndContinue = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      const deployedContract = await factory.methods.createCampaign().send({
        from: accounts[0],
        value: web3.utils.toWei('0.0004', 'ether')
      });

      const deployedAddress = deployedContract.events.TokensSent.returnValues['deployedContract'];

      this.setState({ contractAddress: deployedAddress });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    // console.log(this.state.contractAddress);
    Router.pushRoute(`/campaigns/${this.state.contractAddress}`);
    Router.pushRoute(`/`);



    // console.log(contractAddress);
    // this.setState({ loading: false });


  };


  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values: { subscriberIp, subscriberName, lastName, email, age, city, country } } = this.props;

    return (
      <div>
        <CyberTruck />
      </div>
      // <div>
      //   <Grid.Column style={{ maxWidth: 600 }}>
      //     <Header textAlign='center'>
      //       <h1>Confirm your Details</h1>

      //       <p>Click Confirm if the following details have been correctly entered</p>
      //     </Header>
      //     <Segment>

      //       <h3>Create Campaign</h3>
      //       <Form onSubmit={this.saveAndContinue} error={!!this.state.errorMessage}>
      //         <Message error header="Oops!" content={this.state.errorMessage} />
      //         <Button loading={this.state.loading} primary>
      //           Create!
      //         </Button>
      //       </Form>

      //     </Segment>

      //     {/* <Segment textAlign='center'>
      //     <Button onClick={this.back}>Back</Button>
 
      //     <Button onClick={this.saveAndContinue}>Confirm</Button>
      //   </Segment> */}
      //   </Grid.Column>
      // </div>
    )
  }
}

export default ThirdStep;