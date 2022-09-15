import React, { Component } from "react";
import compileDonation from "../ethereum/compileDonation";
import web3 from "../ethereum/web3";
import { Form, Button } from 'semantic-ui-react';


class Admin extends Component {
  static async getInitialProps(props) {

    const campaigns = await compileDonation.methods.owner().call();
    const subscriberDetails = await compileDonation.methods.getSubscribersDetails().call();

    return {
      balance: web3.utils.fromWei(subscriberDetails[0], "ether"),
      subscriberCount: subscriberDetails[1],
      campaigns
    };
  }

  addBalance = async (e) => {
    e.preventDefault();
    const contractAddress = '0x3D3E3a0767045f4f05CAB6cecA24325F234e3058'
    // Configuring the connection to an Ethereum node
    const signer = web3.eth.accounts.privateKeyToAccount(
      '6ffc83620b302d5a4b3c7c28975e984ac298e94b5c7ff5c37c08bf2cf4c8eb63'
    );
    web3.eth.accounts.wallet.add(signer);
    // Creating the transaction object
    const tx = {
      from: signer.address,
      to: contractAddress,
      value: web3.utils.toWei("0.003"),
    };
    // Assigning the right amount of gas
    tx.gas = await web3.eth.estimateGas(tx);

    // Sending the transaction to the network
    const receipt = await web3.eth
      .sendTransaction(tx)
      .once("transactionHash", (txhash) => {
        console.log(`Mining transaction ...`);
        console.log(`https://rinkeby.etherscan.io/tx/${txhash}`);
      });
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
  }

  render() {
    const {
      campaigns,
      balance,
      subscriberCount
    } = this.props;
    return (
      <div>
        <div>
          Owner: {campaigns}<br />
          Total Balance: {balance}<br />
          subscriberCount: {subscriberCount}
        </div>
        <div>
          <Form>
            <Button onClick={this.addBalance}>Add Balance</Button>
          </Form>
        </div>
      </div>

    );
  }
}
export default Admin;