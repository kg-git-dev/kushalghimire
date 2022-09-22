import React, { Component } from 'react';
import { Grid, Header, Segment, Button, List, Form, Message, Icon } from 'semantic-ui-react';
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';
import CyberTruck from '../CyberTruck';

class ThirdStep extends Component {

  state = {
    loading: false,
    contractAddress: "0x57c24f86A28aac39B77B5c385eF072985190fBe0"
  };

  saveAndContinue = async () => {

    this.setState({ loading: true })

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      const deployedContract = await factory.methods.createCampaign().send({
        from: accounts[0],
        value: web3.utils.toWei('0.0004', 'ether')
      });

      const deployedAddress = deployedContract.events.TokensSent.returnValues['deployedContract'];
      const deployedTime = deployedContract.events.ContractCreation.returnValues['timestamp'];
      console.log(deployedTime);

      this.setState({ contractAddress: deployedAddress });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    console.log(this.state.contractAddress);
    this.setState({ loading: false });
    Router.pushRoute(`/campaigns/${this.state.contractAddress}`);
  };


  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values: { subscriberIp, subscriberName, lastName, email, age, city, country } } = this.props;

    return (
      <div>
        <div>
          <CyberTruck
            saveAndContinue={this.saveAndContinue} />
        </div>
        <div>
          {this.state.loading ? <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>While this might take 20 seconds. Let's examine what's happening.</Message.Header>
              A contract is being created that automatically accepts installment payments, recalculates and recalibrates installment schedules, and finally automatically reposesses and redistributes the ownership of a physical car.  
            </Message.Content>
          </Message> : ''}
        </div>
      </div>
    )

  }
}

export default ThirdStep;