import React, { Component } from "react";
import { Card, Grid, Button, Segment, Rail, Image, Statistic, Icon, Progress } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";
import InstallmentIndicator from "../../components/installments/indicator";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      leasedBy: summary[0],
      paymentsMade: summary[1],
      responseCounter: summary[2],
      skipCounter: summary[3],
      remainingPayment: summary[4],
    };
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
        meta: "Address of LEase Owner",
        description:
          "Address of person who currently holds the lease.",
        style: { overflowWrap: "break-word" },
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

  render() {
    return (
      <Layout>
        <br /><br />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
              <Statistic.Group>
                <Statistic>
                  <Statistic.Value>22</Statistic.Value>
                  <Statistic.Label>Saves</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value text>
                    Three
                    <br />
                    Thousand
                  </Statistic.Value>
                  <Statistic.Label>Signups</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>
                    <Icon name='plane' />5
                  </Statistic.Value>
                  <Statistic.Label>Flights</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>
                    <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' inline circular />
                    42
                  </Statistic.Value>
                  <Statistic.Label>Team Members</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              </Segment>
              <Segment>
                Next payment due: 0.001 ether<br/>
                Made payment: 3<br/>
                Skipped payment: 2<br/>
              </Segment>
              <div>
        <Progress percent={33} indicating />
        <Button onClick={this.increment}>Increment</Button>
      </div>

            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>Recent Transactions</Segment>
              <Segment>Payment 1: January 1, 2022</Segment>
              <Segment>Payment 1: January 1, 2022</Segment>
              <Segment>Payment 1: January 1, 2022</Segment>
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
