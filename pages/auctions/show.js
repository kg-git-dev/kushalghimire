import React, { Component } from "react";
import axios from "axios";
import { Card, Grid, Button, Segment, Rail, Image, Statistic, Icon, Progress, Message, Form } from "semantic-ui-react";
import { Router } from "../../routes";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import InstallmentIndicator from "../../components/installments/indicator";

class CampaignShow extends Component {
  state = {
    loading: false,
    update_counter: '',
    completed_contract: false,
    broken_contract: false,
    makePayment: '',
    errorMessage: '',
    bidAmount: '',
  }

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const etherscan_api = 'U3VC9K7EK1YQUZD9XZUUUW3DQV3P29HKC2'
    const endpoint = "https://api-rinkeby.etherscan.io/api"

    const summary = await campaign.methods.getSummary().call();
    // const repossesed = await campaign.methods.repossesed(`${props.query.address}`).call();

    const etherscan = await axios.get(endpoint + `?module=account&action=txlistinternal&address=0x24C34A9F146ebAC2beED13F8fD0371C7246c3733&blocktype=blocks&apikey=${etherscan_api}`);
    const initializationDate = etherscan.data.result[0].timeStamp;
    const initializationTime = new Date(initializationDate * 1000).toLocaleString("en-US")
    // console.log(initializationTime);

    const requestCount = await campaign.methods.responseCounter().call();
    console.log(requestCount);

    const resoldStatus = await campaign.methods.resold().call();
    const repossesedStatus = await campaign.methods.repossesed(props.query.address).call();
    const bidCounter = await campaign.methods.bidCounter().call()
    const recentBids = await Promise.all(
      Array(parseInt(bidCounter))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    console.log(recentBids);




    let nextPayment;

    if (Number(requestCount) < 6) {
      nextPayment = await campaign.methods.getNextInstallment().call();
    } else {
      nextPayment = '0'
    }

    // const nextPayment = await campaign.methods.getNextInstallment().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.transactionDate(index).call();
        })
    );

    // console.log(requests);



    const paymentTime = new Date(requests[0] * 1000).toLocaleString("en-US")
    console.log(paymentTime);

    const paymentStatus = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.paymentStatus(index).call();
        })
    );

    console.log(paymentStatus[0]);


    return {
      address: props.query.address,
      leasedBy: summary[0],
      paymentsMade: summary[1],
      responseCounter: summary[2],
      skipCounter: summary[3],
      remainingPayment: summary[4],
      nextPayment: nextPayment,
      initializationTime: initializationTime,
      requests: requests,
      paymentStatus: paymentStatus,
      resoldStatus: resoldStatus,
      repossesedStatus: repossesedStatus,
      recentBids: recentBids
    };

  }

  paymentProgressSwitch(paymentProgress) {
    switch (paymentProgress) {
      case 'makePayment':
        return `making payment of ${this.props.nextPayment}`
      case 'skipPayment':
        return 'skipping payment'
      case '1':
        return 'Payment no.1';
      case '2':
        return 'Payment no.2'
      case '3':
        return 'Testing'
      default:
        return 'foo';
    }
  }


  renderRows() {
    const items = this.props.requests.map((request, index) => {
      return {
        header: `${(this.props.paymentStatus[index]) ? 'PAYMENT OF ' + web3.utils.fromWei(this.props.nextPayment, "ether") + ' ETHER' : 'SKIPPED PAYMENT'}`,
        description: new Date(request * 1000).toLocaleString("en-US"),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  renderCards() {
    const {
      recentBids
    } = this.props;

    const items = recentBids.map((request, index) => {
      return {
        key: index,
        header: recentBids[index][0],
        meta: "Bid made by following account",
        description: recentBids[index][1],
        style: { overflowWrap: "anywhere" },
      };
    });
    return <Card.Group items={items} />
  }

  makePayment = async () => {
    const campaign = Campaign(this.props.address);
    console.log('here');

    try {
      const accounts = await web3.eth.getAccounts();
      const userBid = '0.0006';
      await campaign.methods
        .makeBid(web3.utils.toWei(userBid, "ether"))
        .send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  }

  skipPayment = async () => {
    this.setState({ loading: true, makePayment: 'skipPayment' });

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.skipPayment().send({
        from: accounts[0],
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
      console.log(err);
    }
    this.setState({ update_counter: Number(this.props.responseCounter) + 1 });
    Router.pushRoute(`/campaigns/${this.props.address}`);
    this.setState({ loading: false })

  }

  handleSubmit = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({bidAmount: this.state.bidAmount})
    
    try {
      const accounts = await web3.eth.getAccounts();
      const userBid = '0.0006';
      await campaign.methods
        .makeBid(web3.utils.toWei(this.state.bidAmount, "ether"))
        .send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
    Router.pushRoute(`/auctions/${this.props.address}`);
    this.setState({ loading: false })

  }

  handleChange = (event) => {
    this.setState({bidAmount: event.target.value})

  }

  render() {
    const { completed_contract, broken_contract, loading, makePayment, update_counter, bidAmount } = this.state;

    const {
      leasedBy,
      paymentsMade,
      responseCounter,
      skipCounter,
      remainingPayment,
      nextPayment,
      initializationTime,
      resoldStatus,
      repossesedStatus,
      requests,

    } = this.props;

    return (
      <Layout>
        {/* {this.paymentProgressSwitch(indicatorProgress)} */}

        <br /><br />
        <Grid>
          <Grid.Row >
            <Grid.Column width={4} textAlign='center'>
              <Segment>
                <Statistic color={resoldStatus ? 'red' : 'green'}>
                  <Statistic.Value text>
                    {resoldStatus ? 'AUCTION CLOSED' : 'AVAILABLE TO BID'}
                  </Statistic.Value>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={7} textAlign='center'>
              <Segment>
                <Statistic>
                  {/* <Statistic.Value>0.000133333333333333</Statistic.Value> */}
                  <Statistic.Value>{web3.utils.fromWei(remainingPayment, "gwei")}</Statistic.Value>
                  <Statistic.Label>BUY OUT AMOUNT</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'>
              <Segment>
                <Statistic size="tiny">
                  {/* <Statistic.Value>0.000133333333333333</Statistic.Value> */}
                  <Statistic.Value>{web3.utils.fromWei(remainingPayment, "gwei")}</Statistic.Value>
                  <Statistic.Label>CURRENT HIGHEST BID</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={8} textAlign='center'>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  error={this.state.bidAmount < 60000}
                  size='massive'
                  fluid
                  placeholder={`minimum bid of ${web3.utils.fromWei(requests[0][1], "gwei")} `}
                  id='form-input-first-name'
                  defaultValue={bidAmount}
                  onChange={this.handleChange}
                />
                <div className='makePaymentButton'>
                <Button.Group>
                <Form.Button disabled={this.state.bidAmount < 60000} content="Submit Bid" color="orange"></Form.Button>
                <Button.Or />
                <Form.Button content="Claim Highest Bid" color='yellow'></Form.Button>
                <Button.Or />
                <Form.Button content="Buy out Contract" color='green'></Form.Button>
                </Button.Group>
                </div>
                </Form>

              <div>
                <br /><br /><br />
                
                <br />
                <div>
                  <Message hidden={!loading} icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                      <Message.Header>{this.paymentProgressSwitch(makePayment)} {update_counter}</Message.Header>
                      {this.paymentProgressSwitch(responseCounter)}
                    </Message.Content>
                  </Message>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <div>
                <Segment><h2 style={{ color: '#00308F' }}>RECENT BIDS:</h2></Segment>
                <p></p>
              </div>

              <div>
                {this.renderCards()}
              </div>


            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header>{initializationTime}</Card.Header>
                  <Card.Meta>Downpayment of 0.0004 ether made and lease initialized.</Card.Meta>
                  {/* <Card.Description>Downpayment of 0.0004 ether made and lease initialized.</Card.Description> */}
                </Card.Content>
              </Card>
            </Grid.Column>


          </Grid.Row>

        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
