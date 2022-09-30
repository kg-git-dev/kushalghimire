import React, { Component } from "react";
import { Form, Button, Input, Message, Card, Header, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";
import Campaign from "../../ethereum/campaign";
import campaign from "../../ethereum/campaign";

class AuctionList extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    const campaignLength = campaigns.length;

    const availableForAuction = await Promise.all(
      Array(parseInt(campaignLength))
        .fill()
        .map((element, index) => {
          return Campaign(campaigns[index]).methods.repossesed(campaigns[index]).call();
        })
    );

    let auctionList = [];


    for (let i = 0; i < campaignLength; i++) {
      if (availableForAuction[i] == true) {
        const campaign = Campaign(campaigns[i]);;
        const bidCounter = await campaign.methods.bidCounter().call();

        if (bidCounter != 0) {
          let highestBid = await campaign.methods.requests([bidCounter - 1]).call();
          highestBid = highestBid[0];
          auctionList.push({ id: campaigns[i], bidCounter: bidCounter, highestBid: highestBid })
        } else {
          auctionList.push({ id: campaigns[i], bidCounter: '0', highestBid: '0' })
        }
      }
    }

    return { auctionList };
  }



  renderCampaigns() {
    const items = this.props.auctionList.map((auctionDetail, index) => {
      return {
        header: `${auctionDetail.bidCounter} Bids with highest Bid of ${auctionDetail.highestBid}`,
        description: (
          <Link route={`/auctions/${auctionDetail.id}`}>
            <a>View Auction</a>
          </Link>
        ),
        meta: auctionDetail.id,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <br /><br />
          <Grid>
            <Grid.Row centered columns={2}>
              <Grid.Column >
                <Header as='h1' block>
                  OPEN AUCTIONS:
                </Header>
                <br />
                {this.renderCampaigns()}
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </div>
      </Layout>
    );
  }
}

export default AuctionList;
