import React, { Component } from "react";
import axios from "axios";
import { Card, Grid, Button, Segment, Rail, Image, Statistic, Icon, Progress, Message, GridColumn } from "semantic-ui-react";
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
      leasedBy,
      paymentsMade,
      responseCounter,
      skipCounter,
      remainingPayment,
    } = this.props;

    const items = [
      {
        header: leasedBy,
        meta: "Address of Lease Owner",
        // description:
        //   "Address of person who currently holds the lease.",
        style: { overflowWrap: "anywhere" },
      },
      // {
      //   header: responseCounter,
      //   meta: "Total number of installments completed",
      //   description:
      //     "Installment counter out of 6.",
      // },
      // {
      //   header: skipCounter,
      //   meta: "Number of installments skipped",
      //   description:
      //     "Total installment skipped. Maximum of 2. 3 missed installment means repossesion.",
      // },
      // {
      //   header: web3.utils.fromWei(remainingPayment, "ether"),
      //   meta: "Value of remaining contract balance",
      //   description:
      //     "the value auto corrects if any installment is missed to clear the sum.",
      // },
    ];

    return <Card.Group items={items} />;
  }

  makePayment = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, makePayment: 'makePayment' });

    try {
      const accounts = await web3.eth.getAccounts();
      const nextPayment = await campaign.methods.getNextInstallment().call();
      await campaign.methods.makePayment().send({
        from: accounts[0],
        value: nextPayment
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
      console.log(err);
    }
    this.setState({ update_counter: Number(this.props.responseCounter) + 1});
    Router.pushRoute(`/campaigns/${this.props.address}`);
    this.setState({loading: false})
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
    this.setState({ update_counter: Number(this.props.responseCounter) + 1});
    Router.pushRoute(`/campaigns/${this.props.address}`);
    this.setState({loading: false})

  }

  render() {
    const { completed_contract, broken_contract, loading, makePayment, update_counter } = this.state;

    const {
      leasedBy,
      paymentsMade,
      responseCounter,
      skipCounter,
      remainingPayment,
      nextPayment,
      initializationTime,

    } = this.props;

    return (
      <Layout>
        {/* {this.paymentProgressSwitch(indicatorProgress)} */}

        <br /><br />
        <Grid>
          <Grid.Row >
            <Grid.Column width={4} textAlign='center'>
              <Segment>
                <Statistic >
                  <Statistic.Value text>
                    LEASE<br />REPOSSESED
                  </Statistic.Value>
                  <Statistic.Label>Status</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={7} textAlign='center'>
              <Segment>
                <Statistic>
                  {/* <Statistic.Value>0.000133333333333333</Statistic.Value> */}
                  <Statistic.Value>{web3.utils.fromWei(remainingPayment, "ether")}</Statistic.Value>
                  <Statistic.Label>Remaining Balance<br />(Ether)</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment>
                <Statistic.Group widths={3}>

                  <Statistic>
                    <Statistic.Value>
                      <Icon name='checkmark' color="green" />{responseCounter}
                    </Statistic.Value>
                    <Statistic.Label>Made<br />Payments</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='close' color="red" />{skipCounter}
                    </Statistic.Value>
                    <Statistic.Label>Skipped<br />Payment</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='close' color="red" />{skipCounter}
                    </Statistic.Value>
                    <Statistic.Label>Skipped</Statistic.Label>
                  </Statistic>

                </Statistic.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={8} textAlign='center'>
              <Segment>
                <Statistic>
                  <Statistic.Value>{web3.utils.fromWei(nextPayment, "ether")}</Statistic.Value>
                  <Statistic.Label>Next Installment<br />(Ether)</Statistic.Label>
                </Statistic>
              </Segment>
              <div>
                <Progress value={Number(responseCounter) > Number(update_counter) ? responseCounter : update_counter} total='6' progress='ratio' indicating success={completed_contract} error={broken_contract} />
                <div class='makePaymentButton'>
                  <Button.Group>
                    <Button disabled={loading} negative onClick={this.skipPayment}>Skip Payment</Button>
                    <Button.Or />
                    <Button disabled={loading} positive onClick={this.makePayment}>Make Payment</Button>
                  </Button.Group>
                </div>
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
            <Segment><h2 style={{color: '#00308F'}}>CONTRACT INFO:</h2></Segment>
           </div>
              <Card>
                <Card.Content>
                  <Card.Header>{initializationTime}</Card.Header>
                  <Card.Meta>Downpayment of 0.0004 ether made and lease initialized.</Card.Meta>
                  {/* <Card.Description>Downpayment of 0.0004 ether made and lease initialized.</Card.Description> */}
                </Card.Content>
              </Card>
              <div>
                {this.renderCards()}
              </div>


            </Grid.Column>
            <Grid.Column width={4}>
              {this.renderRows()}
            </Grid.Column>
            

          </Grid.Row>

        </Grid>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <InstallmentIndicator responseCounter={this.props.responseCounter} />
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
