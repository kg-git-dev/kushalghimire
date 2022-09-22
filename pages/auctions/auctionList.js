import React, { Component } from "react";
import { Form, Button, Input, Message, Card } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";
import Campaign from "../../ethereum/campaign";

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
    
    for (let i = 0; i < campaignLength; i++){
      if(availableForAuction[i] == true){
        auctionList.push(campaigns[i])
      }
    }
    return { auctionList };
  }

  renderCampaigns() {
    const items = this.props.auctionList.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/auctions/${address}`}>
            <a>View Auction</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Auctions</h3>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default AuctionList;
