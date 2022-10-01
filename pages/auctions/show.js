import React, { Component } from "react";
import axios from "axios";
import { Card, Grid, Button, Segment, Statistic, Icon, Message, Form } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { ethers } from "ethers";

class CampaignShow extends Component {
  state = {
    loading: false,
    update_counter: '',
    completed_contract: false,
    broken_contract: false,
    makePayment: '',
    errorMessage: '',
    bidAmount: '',
    paymentType: '',
  }

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const etherscan_api = 'U3VC9K7EK1YQUZD9XZUUUW3DQV3P29HKC2'
    const endpoint = "https://api-rinkeby.etherscan.io/api"

    const summary = await campaign.methods.getSummary().call();
    // const repossesed = await campaign.methods.repossesed(`${props.query.address}`).call();

    const etherscan = await axios.get(endpoint + `?module=account&action=txlistinternal&address=${props.query.address}&blocktype=blocks&apikey=${etherscan_api}`);
    const initializationDate = etherscan.data.result[0].timeStamp;
    const initializationTime = new Date(initializationDate * 1000).toLocaleString("en-US")
    console.log(initializationTime);

    const requestCount = await campaign.methods.responseCounter().call();

    const resoldStatus = await campaign.methods.resold().call();
    const repossesedStatus = await campaign.methods.repossesed(props.query.address).call();
    let bidCounter = await campaign.methods.bidCounter().call()

    const recentBids = await Promise.all(
      Array(parseInt(bidCounter))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    // console.log(recentBids);




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
    // console.log(paymentTime);

    const paymentStatus = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.paymentStatus(index).call();
        })
    );

    // console.log(paymentStatus[0]);

    let bidWinnerDate = '';
    if (bidCounter != 0) {
      bidWinnerDate = await campaign.methods.bidWinnerDate().call();
    }

    let bidWinnerAddress = '';
    if (resoldStatus) {
      bidWinnerAddress = await campaign.methods.ownerAddress().call();
    }


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
      recentBids: recentBids,
      bidCounter: bidCounter,
      requestCount: requestCount,
      bidWinnerDate: bidWinnerDate,
      bidWinnerAddress: bidWinnerAddress,
    };

  }

  paymentProgressSwitch(paymentType) {
    switch (paymentType) {
      case 'bid':
        return (
          {
            '0': `Making bid of ${Number(this.state.bidAmount).toLocaleString()}`,
            '1': 'For demonstration, you can claim the latest bid as highest and win the auction required ownership of latest bid.'
          })
      case 'claim':
        return (
          {
            '0': `Claiming highest bid of ${Number(web3.utils.fromWei((this.props.recentBids[this.props.bidCounter - 1][0]), 'gwei')).toLocaleString()}`,
            '1': 'If you receive rinkeby ether in the future, it will most likely be the surplus transfer from a succesful auction.'
          })
      case 'buy':
        return (
          {
            '0': 'Paying release fee of 60,000.',
            '1': 'Thank you for going through the demonstration :).'
          })
      default:
        return 'foo';
    }
  }


  renderRows() {
    const items = this.props.requests.map((request, index) => {
      return {
        header: `${(this.props.paymentStatus[index]) ? 'PAYMENT OF ' + web3.utils.fromWei(this.props.nextPayment, "gwei") + ' ETHER' : 'SKIPPED PAYMENT'}`,
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

    const reversedBids = recentBids.map(item => item).reverse();

    const items = reversedBids.map((request, index) => {
      return {
        key: index,
        header: `${Number(web3.utils.fromWei(reversedBids[index][0], 'gwei')).toLocaleString()}`,
        meta: "Bid made by following account",
        description: reversedBids[index][1],
        style: { overflowWrap: "anywhere" },
      };
    });
    return <Card.Group items={items} />
  }

  handleChange = (event) => {
    this.setState({ bidAmount: Number(event.target.value) })

  }

  handleSubmit = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ bidAmount: this.state.bidAmount, loading: true, errorMessage: '', paymentType: 'bid' })
    const decimals = 9;
    const amount = ethers.utils.parseUnits((this.state.bidAmount).toString(), decimals);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .makeBid(amount)
        .send({ from: accounts[0] });

    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    if (!this.state.errorMessage) {
      window.location.reload();
    } else {
      this.setState({ loading: false })
    }


  }



  claimBid = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ errorMessage: '', paymentType: 'claim' })
    const accounts = await web3.eth.getAccounts();
    if (accounts[0] == this.props.recentBids[this.props.bidCounter - 1][1]) {
      this.setState({ loading: true })
      try {
        await campaign.methods
          .highestBidTransfer(this.props.bidCounter - 1)
          .send({
            from: accounts[0],
            value: this.props.recentBids[this.props.bidCounter - 1][0],
          });

      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

    } else {
      this.setState({ errorMessage: 'Highest bid was not made by this account!!' });
    }
    if (!this.state.errorMessage) {
      window.location.reload();
    } else {
      this.setState({ loading: false })
    }
  }

  buyOutContract = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ errorMessage: '', paymentType: 'buy' })
    const accounts = await web3.eth.getAccounts();
    if (accounts[0] == this.props.recentBids[this.props.bidCounter - 1][1]) {
      this.setState({ loading: true })
      try {
        await campaign.methods
          .buyContract()
          .send({
            from: accounts[0],
            value: web3.utils.toWei('0.00006', 'ether'),
          });

      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

    }
    if (!this.state.errorMessage) {
      window.location.reload();
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    const { completed_contract, broken_contract, loading, makePayment, update_counter, bidAmount, errorMessage, paymentType } = this.state;

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
      recentBids,
      bidCounter,
      requestCount,
      bidWinnerDate,
      bidWinnerAddress,

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
                  <Statistic.Value>{bidCounter != 0 ? Number(web3.utils.fromWei(recentBids[bidCounter - 1][0], "gwei")).toLocaleString() : 'NO BIDS'}</Statistic.Value>
                  <Statistic.Label>CURRENT HIGHEST BID</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'>
              <Segment>
                <Statistic size="tiny">
                  <Statistic.Value>60,000</Statistic.Value>
                  <Statistic.Label>BUYOUT AMOUNT</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={8} textAlign='center'>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  error={bidCounter != 0 ? ((this.state.bidAmount) <= web3.utils.fromWei(recentBids[bidCounter - 1][0], "gwei") || (this.state.bidAmount >= 60000)) : (this.state.bidAmount < web3.utils.fromWei(remainingPayment, "gwei") || this.state.bidAmount >= 60000)}
                  size='massive'
                  fluid
                  placeholder={`Bid more than ${bidCounter != 0 ? Number(web3.utils.fromWei(recentBids[bidCounter - 1][0], "gwei")).toLocaleString() + ' and less than 60,000' : Number(web3.utils.fromWei(remainingPayment, "gwei")).toLocaleString() + ' and less than 60,000'}  `}
                  id='form-input-first-name'
                  onChange={this.handleChange}
                  type='number'
                  disabled={loading || resoldStatus}
                />
              </Form>

              <div><br /><br /></div>

              <div className='makePaymentButton'>
                <Button.Group>
                  <Form.Button onClick={this.handleSubmit} disabled={loading ? true : bidCounter != 0 ? ((this.state.bidAmount) <= web3.utils.fromWei(recentBids[bidCounter - 1][0], "gwei") || (this.state.bidAmount >= 60000)) : (this.state.bidAmount < web3.utils.fromWei(remainingPayment, "gwei") || this.state.bidAmount >= 60000)} content="Submit Bid" color="orange"></Form.Button>
                  <Button.Or />
                  <Button onClick={this.claimBid} disabled={bidCounter == 0 || loading || resoldStatus} content="Claim Highest Bid" color='yellow'></Button>
                  <Button.Or />
                  <Button onClick={this.buyOutContract} disabled={loading || resoldStatus} content="Buy out Contract" color='green'></Button>
                </Button.Group>
              </div>

              <div>
                <br /><br />
                <div>
                  {loading ? <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                      <Message.Header>{this.paymentProgressSwitch(paymentType)[0]}</Message.Header>
                      {this.paymentProgressSwitch(paymentType)[1]}
                    </Message.Content>
                  </Message> : errorMessage ? <Message negative>
                    <Message.Header>There has been an error!</Message.Header>
                    <p>{errorMessage}</p>
                  </Message> : ''}
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
                  <Card.Description>Downpayment of 40,000 made and lease initialized.</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content><Card.Header>{new Date(requests[requestCount - 1] * 1000).toLocaleString("en-US")}</Card.Header>
                  <Card.Description>Contract repossesed and made avaialble to auction.</Card.Description>
                </Card.Content>
              </Card>
              {resoldStatus ? <Card>
                <Card.Content><Card.Header>{new Date(bidWinnerDate * 1000).toLocaleString("en-US")}</Card.Header>
                  <Card.Meta>Auction won on the above date by the following account:</Card.Meta>
                  <Card.Description><span style={ {overflowWrap: "anywhere" }}>{bidWinnerAddress}</span></Card.Description>                
                </Card.Content>
              </Card> : ''}

            </Grid.Column>


          </Grid.Row>

        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
