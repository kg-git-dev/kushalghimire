import React, { Component } from "react";
import axios from "axios";
import { Card, Grid, Button, Segment, Rail, Image, Statistic, Icon, Progress, Message, GridColumn, Modal, Header } from "semantic-ui-react";
import { Router } from "../../routes";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import InstallmentIndicator from "../../components/installments/indicator";

class CampaignShow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      address: '',
      initializationTime: 'LOADING',
      loading: false,
      update_counter: '',
      final_payment: false,
      broken_contract: false,
      makePayment: '',
      errorMessage: '',
      open: false,
    };
  }

  async componentDidMount() {
    this.gettingApiData();
  }

  async componentDidUpdate(){   
    if(this.state.initializationTime == 'LOADING'){
      this.gettingApiData();
    }
  }

  async gettingApiData() {
    const etherscan_api = 'U3VC9K7EK1YQUZD9XZUUUW3DQV3P29HKC2';
    const endpoint = "https://api-rinkeby.etherscan.io/api";
    const initializationTime = await axios
      .get(endpoint + `?module=account&action=txlistinternal&address=${this.props.address}&blocktype=blocks&apikey=${etherscan_api}`)
      .then(res => {
        const { result } = res.data;
        if (result.length != 0) {
          const initializationTime = new Date(result[0].timeStamp * 1000).toLocaleString("en-US");
          return initializationTime;
        } else {
          return 'LOADING';
        }
      });
    this.setState({ initializationTime: initializationTime })
  }


  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    // const repossesed = await campaign.methods.repossesed(`${props.query.address}`).call();

    const requestCount = await campaign.methods.responseCounter().call();
    // console.log(requestCount);

    const repossesedStatus = await campaign.methods.repossesed(props.query.address).call();
    console.log(repossesedStatus);

    const leaseOwner = await campaign.methods.owner(summary[0]).call();




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


    const paymentStatus = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.paymentStatus(index).call();
        })
    );

    const lastPayment = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.lastPayment(index).call();
        })
    );


    // console.log(paymentStatus[0]);


    return {
      address: props.query.address,
      leasedBy: summary[0],
      paymentsMade: summary[1],
      responseCounter: summary[2],
      skipCounter: summary[3],
      remainingPayment: summary[4],
      nextPayment: nextPayment,
      requests: requests,
      paymentStatus: paymentStatus,
      lastPayment: lastPayment,
      repossesedStatus: repossesedStatus,
      leaseOwner: leaseOwner,
      requestCount: requestCount,
    };

  }

  paymentProgressSwitch(paymentProgress) {
    switch (paymentProgress) {
      case 'makePayment':
        return `MAKING INSTALLMENT PAYMENT OF ${this.props.nextPayment.slice(0, -9)}`
      case 'skipPayment':
        return `SKIPPING PAYMENT ${Number(this.props.skipCounter) + 1} of 2`
      default:
        return '';
    }
  }


  renderRows() {
    const items = this.props.requests.map((request, index) => {
      return {
        header: `${(this.props.paymentStatus[index]) ? 'Payment of ' + web3.utils.fromWei(this.props.lastPayment[index], "gwei") + ' ' : 'SKIPPED PAYMENT'}`,
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
    ];

    return <Card.Group items={items} />;
  }

  makePayment = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, makePayment: 'makePayment', errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const nextPayment = await campaign.methods.getNextInstallment().call();
      await campaign.methods.makePayment().send({
        from: accounts[0],
        value: nextPayment
      });
    } catch (err) {
      this.setState({ loading: false, errorMessage: err.message });
    }

    if (!this.state.errorMessage) {
      this.setState({ update_counter: Number(this.props.responseCounter) + 1 });
      window.location.reload();
    }
  }

  skipPayment = async () => {
    this.setState({ loading: true, makePayment: 'skipPayment', errorMessage: '' });

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.skipPayment().send({
        from: accounts[0],
      });
    } catch (err) {
      this.setState({ loading: false, errorMessage: err.message });
    }

    if (!this.state.errorMessage) {
      this.setState({ update_counter: Number(this.props.responseCounter) + 1 });
      window.location.reload();
    }

  }

  setModalOff = () => {
    this.setState({ open: false, errorMessage: false })
  }

  setModalOn = () => {
    this.setState({ open: true })
  }

  skipPaymentModal = async () => {
    this.setState({ final_payment: true })
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
    // Router.pushRoute(`/campaigns/${this.props.address}`).then(this.setState({ open: false, final_payment: false }));
    window.location.reload();

  }

  render() {
    const { completed_contract, broken_contract, loading, makePayment, update_counter, open, final_payment, errorMessage, initializationTime } = this.state;

    const {
      leasedBy,
      paymentsMade,
      responseCounter,
      skipCounter,
      remainingPayment,
      nextPayment,
      repossesedStatus,
      leaseOwner,
      requests,
      requestCount,


    } = this.props;

    return (
      <Layout>
        {/* {this.paymentProgressSwitch(indicatorProgress)} */}
        <Modal
          basic
          onClose={this.setModalOff}
          onOpen={this.setModalOn}
          open={open}
          size='small'
          dimmer='blurring'
        >
          <Modal.Content><p><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </p></Modal.Content>

          <Header icon>
            <Icon name='warning circle' color="red" />
            Are you sure you want to skip the next payment?
          </Header>
          <Modal.Content>
            <p>
              Skipping next payment will cause the lease to be repossesed and made available for auction.
            </p>
          </Modal.Content>
          {this.state.final_payment ? <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Skipping Payment</Message.Header>
              The lease has been repossesed due to non compliance with terms and conditions and will be set for auction.
            </Message.Content>
          </Message> : ''}
          <Modal.Actions>
            {!this.state.final_payment ? <div><Button basic color='red' inverted onClick={this.setModalOff}>
              <Icon name='remove' /> No
            </Button>
              <Button color='green' inverted onClick={this.skipPaymentModal}>
                <Icon name='checkmark' /> Yes
              </Button></div> : ''}
          </Modal.Actions>
        </Modal>

        <br /><br />
        <Grid>
          <Grid.Row >
            <Grid.Column width={4} textAlign='center'>
              <Segment>
                <Statistic color={leaseOwner ? 'green' : repossesedStatus ? 'red' : 'black'}>
                  <Statistic.Value text>
                    {repossesedStatus ? ('SENT TO AUCTION') : leaseOwner ? ('OWNERSHIP TRANSFERED') : <div>LEASE<br />ACTIVE</div>}
                  </Statistic.Value>
                  <Statistic.Label>Status</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={7} textAlign='center'>
              <Segment>
                <Statistic>
                  {<Statistic.Value>{web3.utils.fromWei(remainingPayment, "gwei")}</Statistic.Value>}
                  <Statistic.Label>Remaining Balance <br />(PAYABLE)</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment>
                <Statistic.Group widths={3}>

                  <Statistic>
                    <Statistic.Value>
                      <Icon name='checkmark' color="green" />{responseCounter - skipCounter}
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
                      <Icon name='exclamation triangle' color="green" size="small" fitted />{responseCounter == 0 ? 2 : skipCounter >= 2 ? '0' : 2 - skipCounter}
                    </Statistic.Value>
                    <Statistic.Label>Available<br />Skips</Statistic.Label>
                  </Statistic>

                </Statistic.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={8} textAlign='center'>
              {repossesedStatus ? <div><Segment><p><b>THESE LEASE HAS BEEN REPOSSESED AND MADE AVAILABLE ON AUCTION</b></p><p>You can check auction list here: <a href="https://www.kushalghimire.com/auctions">AUCTION LIST</a></p></Segment></div> : leaseOwner ? <div><Segment><p><h2>Installment plan successfuly completed and ownership transfered to leasee.</h2></p></Segment></div> : <div><Segment>
                <Statistic>
                  <Statistic.Value>{web3.utils.fromWei(nextPayment, "gwei")}</Statistic.Value>
                  <Statistic.Label>Next Installment</Statistic.Label>
                </Statistic>
              </Segment>
                <div>
                  <Progress value={Number(responseCounter) > Number(update_counter) ? Number(responseCounter) : Number(update_counter)} total='6' progress='ratio' indicating success={completed_contract} error={broken_contract} />
                  <div className='makePaymentButton'>
                    <Button.Group>
                      <Button disabled={loading} negative onClick={responseCounter == 6 || skipCounter == 2 ? this.setModalOn : this.skipPayment}>Skip Payment</Button>

                      {/* <Button disabled={loading} negative onClick={responseCounter == 6 ? this.skipPaymentModal ? skipCounter == 2 : this.skipPaymentModal : this.skipPayment}>Skip Payment</Button> */}
                      <Button.Or />
                      <Button disabled={loading} positive onClick={this.makePayment}>Make Payment</Button>
                    </Button.Group>
                  </div>
                  <br />
                  <div>
                    <Message hidden={!loading} icon>
                      <Icon name='circle notched' loading />
                      <Message.Content>
                        <Message.Header>{this.paymentProgressSwitch(makePayment)} </Message.Header>
                      </Message.Content>
                    </Message>


                    <Message negative hidden={!errorMessage}>
                      <Message.Header>There has been an error</Message.Header>
                      <p>{errorMessage}</p>
                    </Message>
                  </div>
                </div>
              </div>}


            </Grid.Column>
            <Grid.Column width={4}>
              <div>
                <Segment><h2 style={{ color: '#00308F' }}>CONTRACT INFO:</h2></Segment>
              </div>
              <Card>
                <Card.Content>
                  <Card.Header>{initializationTime}</Card.Header>
                  <Card.Meta>Downpayment of 40,000 made and lease initialized.</Card.Meta>
                  {/* <Card.Description>Downpayment of 0.0004 ether made and lease initialized.</Card.Description> */}
                </Card.Content>
              </Card>
              <div>
                {repossesedStatus ? <div><Card><Card.Content><Card.Header>{new Date(requests[requestCount - 1] * 1000).toLocaleString("en-US")}</Card.Header><Card.Description>Contract repossesed and made avaialble to auction.</Card.Description></Card.Content></Card><p></p></div> : leaseOwner ? <div><Card><Card.Content><Card.Header>{new Date(requests[requestCount - 1] * 1000).toLocaleString("en-US")}</Card.Header><Card.Description>Ownership transfered to Leasee after succesful completion.</Card.Description></Card.Content></Card><p></p></div> : ''}
              </div>
              <div>
                {this.renderCards()}
              </div>


            </Grid.Column>
            <Grid.Column width={4}>
              {this.renderRows()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
