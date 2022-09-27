import React, { Component } from 'react';
import { Flag, Grid, Header, Segment, Form, Button, Message, Divider } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Tutorial from '../Tutorial';
import TransferEther from '../TransferEther';

import detectEthereumProvider from '@metamask/detect-provider'
import compileDonation from '../../ethereum/compileDonation';
const EthCrypto = require('eth-crypto');

class SecondStep extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  modalControlNext = () => {
    this.props.nextStep();
  }

  nextStepTest = () => {
    this.props.nextStep();
  }

  saveAndContinue = async (e) => {
    this.setState({ errorMessage: "" });
    const provider = await detectEthereumProvider();
    const contractAddress = '0x041538C7E3343BDb8C5600b2e7AA7F683cE85860'
    const owner = await compileDonation.methods.owner().call();
    const accounts = await web3.eth.getAccounts();
    const myNonce = await web3.eth.getTransactionCount(owner);
    const privateKey = '6ffc83620b302d5a4b3c7c28975e984ac298e94b5c7ff5c37c08bf2cf4c8eb63';

    const signHash = EthCrypto.hash.keccak256([
      { // prefix
        type: 'string',
        value: 'Signed for DonationBag:'
      }, { // contractAddress
        type: 'address',
        value: contractAddress
      }, { // owner Address
        type: 'address',
        value: owner
      }
    ]);

    const signature = EthCrypto.sign(
      privateKey,
      signHash
    );

    const vrs = EthCrypto.vrs.fromString(signature);

    console.log(vrs);

    const recieveCode = compileDonation
      .methods.recieveDonation(
        accounts[0],
        vrs.v,
        vrs.r,
        vrs.s
      ).encodeABI();


    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
      privateKey
    );
    web3.eth.accounts.wallet.add(signer);

    const tx = {
      from: owner,
      to: contractAddress,
      nonce: myNonce,
      data: recieveCode
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

    const totalBalance = await compileDonation.methods.getBalance().call();
    console.log(totalBalance);


    if (provider) {

      this.props.nextStep();

      const chainId = await provider.request({
        method: 'eth_chainId',
      })
      console.log(chainId);
    } else {

      // if the provider is not detected, detectEthereumProvider resolves to null
      this.setState({ errorMessage: 'Please activate metamask' })

    }
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props;

    const { values: { subscriberIp, subscriberName, subscriberCountry } } = this.props;


    return (
      <div>
        <Grid.Column>
          <Segment>
            <div>
              <h1 class="ui header">
                <p> Hello <span style={{ color: '#4183c4' }}>{subscriberName ? subscriberName : 'Kind Stranger'}</span> from {subscriberCountry}!! <Flag name={subscriberCountry.toLowerCase()} />
                </p>
              </h1>
              <b>In web 1.0 I was building card games and static html sites for experimentation.
                <br/>In web 2.0 I built multiple companies with wordpress, PHP and javascript.
                <br/>In web 3.0 I have started with this demonstration.
                <br/>Similar to Baseball, this feels like a new innings.  
              </b>
              <p><br /></p>
            </div>
            <div>
              <h3 class="ui block header">
                TERMS AND CONDITIONS FOR THE DEMONSTRATION!
              </h3>
            </div>
            <div>
              <div>
                <br/><p>KG Motors is proud to announce our (<i>hypothetical</i>) partnership with Tesla Cyber Truck. As authorized sellers, we are offering a specialized financing package of 40% downpayment and 4 to 6 even payments.</p>
                <p>In lieu of transparency, missing more than 2 or the final payment will result in the car being repossesed and sold in auction.</p>
                <p>Signees are requested to review the terms carefully since the path will be executed exactly as defined in the contract and cannot be altered or intervined with.</p>
               </div>
              <div class="ui list">
                <div class="item">
                  <div class="header">Initialize your Wallet</div>
                  An initializing balance of 0.0015 ether is transfered into your account. 
                  <ul>
                    <li>Please note it requires connection to the Rinkeby Test Network. Connecting to the test network is documented after the "Continue" button.</li>
                    <li>A user can request ether once with one wallet key.</li>
                    <li>Blockchain protocol requires initiating party to pay for gas fees. However, since it is unlikely users had access to Rinkeby Ether to initialize the contract, we will transfer the amount of 0.001 ether to interact with the contract (<i>Assuming, user paid US dollar to get the currency equvalence transfered into their account</i>).</li>
                  </ul>
                </div>
                <div class="item">
                  <div class="header">Initialize the contract</div>
                  You can initialize the contract to lease a new KG Motor Cars by making a downpayment of 0.004 ether. The deposit is non refundable and paid directly to KG Motors.
                  <ul>
                    <li>Coming in the next page</li>
                  </ul>
                </div>
                <div class="item">
                  <div class="header">Lease Regulations</div>
                  There are certain regulations to be followed for the correct compliance of the lease contract.
                  <ul>
                    <li>The remaining balance to be paid in 6 installments.</li>
                    <li>Lease Owner is permitted a maximum of 2 missed payments. Third miss results in forfeiture.</li>
                    <li>Missing the final payment results in forfeiture.</li>
                    <li>Forfeited vehicles to be offered in auction. With the balance from auction sale transfered to KG motors for balance owed. Surplus balance transfered to forfeiting party.</li>
                  </ul>
                </div>
                <div class="item">
                  <div class="header">Auction Regulatoins</div>
                  Repossesed contracts will be available for auction with maximum bidding price set to the remaining balance for practicality.
                  <ul>
                    <li>Bids have to exceed prior bids to be registered.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Segment>
          <Segment>
            <div>
              <TransferEther
                modalControlNext={this.modalControlNext}
                subscriberName={subscriberName}
                subscriberIp={subscriberIp}
                subscriberCountry={subscriberCountry}
              />
            </div>
          </Segment>
          {/* <div>
            <Tutorial
              nextStepTest={this.nextStepTest}
              subscriberName={subscriberName}
              subscriberIp={subscriberIp}
              subscriberCountry={subscriberCountry}
            /><br />
          </div> */}
        </Grid.Column>
      </div>
    )
  }
}

export default SecondStep; 